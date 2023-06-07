locals {

  # Context detilas
  region = "eu-west-3"
  stage  = "staging"

  # Cognito detilas
  cognito_default_user_email = "dev@moveohls.com"

  # Database detilas
  atlas_users = ["dev@moveohls.com"]

  # Github details
  client_branch_name = "staging"
  server_branch_name = "staging"
}