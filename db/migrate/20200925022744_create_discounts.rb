class CreateDiscounts < ActiveRecord::Migration[5.2]
  def change
    create_table :discounts do |t|
      t.boolean :active, default: true
      t.string :title
      # quantity
      # amount
      t.string :buy_type, default: 'quantity'
      t.decimal :buy_value, default: 0
      t.jsonb :buy_products, default: []
      t.string :buy_products_id, default: ''
      t.jsonb :get_products, default: []
      t.string :get_products_id, default: ''
      t.integer :get_value, default: 0
      # fixed
      # percentage
      t.string :offer_type, default: 'fixed'
      t.decimal :offer_value
      t.timestamps
    end
  end
end
