locals {

  # Context detilas
  region = "eu-west-3"
  stage  = "production"

  # Cognito detilas
  cognito_default_user_email = "dev@moveohls.com"

  # Database detilas
  atlas_users = ["dev@moveohls.com"]

  # Github details
  client_branch_name = "production"
  server_branch_name = "production"
}