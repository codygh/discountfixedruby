class Api::Client::DiscountController < ActionController::Base
  protect_from_forgery with: :null_session
  
  def search
    query = "active = true and buy_products_id like '%" + params[:id].to_s + "%'"
    
    discounts = Discount.where(query)

    render json: discounts.as_json
  end

  def checkout
    shop = Shop.first
    shop.with_shopify_session do
      total_discount = 0;
      items = params[:items]
      pass = [0]

      products_id = items.map{|item| item['product_id'].to_s}

      for item in items do
        query = "active = true and buy_products_id like '%" + item['product_id'].to_s + "%' and id not in ("+pass.join(',')+")"
        discounts = Discount.where(query)
        for discount in discounts do
          pass.push discount.id
          common = products_id & discount.get_products_id.split('-')
          p common
          p discount.offer_value.to_i
          total_discount = total_discount + discount.offer_value * common.length
          p total_discount.to_i
        end
      end

      if total_discount > 0
        #create discount
        price_rule = ShopifyAPI::PriceRule.new
        price_rule.allocation_method = "across"
        price_rule.target_selection = "all"
        price_rule.target_type = "line_item"
        price_rule.value_type = "fixed_amount"
        price_rule.value = -total_discount
        price_rule.usage_limit = 1
        price_rule.title = "Created by custom app for cart token "+ params[:token]
        price_rule.starts_at = "2019-01-01T00:00:00Z"
        price_rule.customer_selection = "all"
        price_rule.save

        discount_code = ShopifyAPI::DiscountCode.new
        discount_code.prefix_options[:price_rule_id] = price_rule.id
        discount_code.code = (0...15).map { (65 + rand(26)).chr }.join
        discount_code.save

        render json: {'discount_amount': total_discount, 'discount_code': discount_code.code}
      else
        render json: {'discount_amount': 0}
      end
    end
  end
end