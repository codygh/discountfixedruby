ShopifyApp.configure do |config|
  config.application_name = "My Shopify App"
  config.api_key = ENV['SHOPIFY_API_KEY']
  config.secret = ENV['SHOPIFY_API_SECRET']
  app_url = ENV['SHOPIFY_APP_URL']
  config.old_secret = ""
  config.scope = "read_products, write_script_tags, write_price_rules, read_price_rules" # Consult this page for more scope options:
                                 # https://help.shopify.com/en/api/getting-started/authentication/oauth/scopes
  config.embedded_app = true
  config.after_authenticate_job = false
  config.api_version = "2020-07"
  config.shop_session_repository = 'Shop'
  config.allow_jwt_authentication = true

  config.scripttags = [
    {event:'onload', src: app_url+'/common.min.js'},
  ]
end

# ShopifyApp::Utils.fetch_known_api_versions                        # Uncomment to fetch known api versions from shopify servers on boot
# ShopifyAPI::ApiVersion.version_lookup_mode = :raise_on_unknown    # Uncomment to raise an error if attempting to use an api version that was not previously known
