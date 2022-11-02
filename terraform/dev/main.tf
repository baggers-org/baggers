terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  # cloud {
  #   organization = "Baggers"

  #   workspaces {
  #     name = "baggers-dev"
  #   }
  # }
}


# Configure the AWS Provider
provider "aws" {
  region = "eu-west-1"
  allowed_account_ids = [ var.account_id ]
}

module "ecr" {
  source = "../modules/ecr/"
}

module "cluster" {
  source = "../modules/cluster/"
  ui_repo_url = module.ecr.ui_repo_url
  api_repo_url = module.ecr.api_repo_url
  scheulder_repo_url = module.ecr.scheulder_repo_url
}