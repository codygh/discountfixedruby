class Api::DiscountController < ShopifyApp::AuthenticatedController
  protect_from_forgery with: :null_session

  def show
    id = params[:id]

    discount = Discount.find(id)
    
    render json: discount.as_json
  end

  def search
    q = params[:q]
    discount = nil
    if q == nil or q == ''
      discount = Discount.all
    else
      discount = Discount.where('LOWER(title) like ?', '%'+ q + '%')
    end

    render json: discount.as_json
  end

  def create
    discount = Discount.new
    discount.title = params['title']
    discount.active = params['active']
    discount.buy_type = params['buy_type']
    discount.buy_value = params['buy_value']
    discount.buy_products = params['buy_products']
    discount.buy_products_id = params['buy_products_id']
    discount.get_products = params['get_products']
    discount.get_products_id = params['get_products_id']
    discount.get_value = params['get_value']
    discount.offer_type = params['offer_type']
    discount.offer_value = params['offer_value']
    discount.save

    render json: discount.as_json
  end

  def update
    discount = Discount.find(params['id'])
    if discount != nil
      discount.title = params['title']
      discount.active = params['active']
      discount.buy_type = params['buy_type']
      discount.buy_value = params['buy_value']
      discount.buy_products = params['buy_products']
      discount.buy_products_id = params['buy_products_id']
      discount.get_products = params['get_products']
      discount.get_products_id = params['get_products_id']
      discount.get_value = params['get_value']
      discount.offer_type = params['offer_type']
      discount.offer_value = params['offer_value']
      discount.save
    end

    render json: discount.as_json
  end

  def delete
    id = params['id']
    Discount.find(id).delete
    render json: {'result': true}
  end
end