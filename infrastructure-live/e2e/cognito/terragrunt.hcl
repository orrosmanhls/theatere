include "root" {
  path = find_in_parent_folders()
}

terraform {
  source = "../terraform/"
}


inputs={
  cognito_default_user_email="eliran@moveohls.com"
}