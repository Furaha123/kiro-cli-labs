variable "project" {
  default = "mywebapp"
}

variable "environment" {
  default = "prod"
}

variable "region" {
  default = "us-east-1"
}

variable "vpc_cidr" {
  default = "10.0.0.0/16"
}

variable "public_subnets" {
  default = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnets" {
  default = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "azs" {
  default = ["us-east-1a", "us-east-1b"]
}

variable "container_image" {
  default = "123456789012.dkr.ecr.us-east-1.amazonaws.com/myapp:latest"
}

variable "app_port" {
  default = 3000
}

variable "ecs_cpu" {
  default = 2048
}

variable "ecs_memory" {
  default = 256
}

variable "desired_tasks" {
  default = 4
}

variable "db_engine_version" {
  default = "8.0"
}

variable "db_instance_class" {
  default = "db.r6g.large"
}

variable "db_storage" {
  default = 50
}

variable "db_name" {
  default = "webapp_db"
}

variable "db_username" {
  default = "admin"
}

variable "domain" {
  default = "myapp.example.com"
}

variable "health_check_path" {
  default = "/health"
}

variable "s3_bucket" {
  default = "myapp-static-assets"
}
