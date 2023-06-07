
module "aws_cognito_user_pool" {

  source = "lgallard/cognito-user-pool/aws"

  user_pool_name             = "simple_pool"
  username_attributes        = ["email"]
  auto_verified_attributes   = ["email"]
  sms_authentication_message = "Your username is {username} and temporary password is {####}."
  sms_verification_message   = "This is the verification message {####}."

  # user_pool_domain
  domain = "e2e-node-monorepo"
  # clients
  clients = [
    {
      allowed_oauth_flows                  = ["code"]
      allowed_oauth_flows_user_pool_client = true
      allowed_oauth_scopes                 = ["email", "openid", "profile"]
      prevent_user_existence_errors        = "ENABLED"
      callback_urls                        = var.client_callback_urls
      default_redirect_uri                 = var.client_default_redirect_uri
      explicit_auth_flows                  = []
      generate_secret                      = false
      logout_urls                          = var.client_logout_urls
      name                                 = "web-app"
      read_attributes                      = ["email"]
      supported_identity_providers         = ["COGNITO"]
      write_attributes                     = []
      access_token_validity                = 1
      id_token_validity                    = 1
      refresh_token_validity               = 1
      token_validity_units = {
        access_token  = "hours"
        id_token      = "hours"
        refresh_token = "days"
      }
    }
  ]

  # tags
  tags = {
    Owner       = "e2e-monorepo"
    Environment = "e2e"
    Terraform   = true
  }
}
