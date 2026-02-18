output "vpc_id" {
  value = aws_vpc.main.id
}

output "alb_dns_name" {
  value = aws_lb.main.dns_name
}

output "cloudfront_domain" {
  value = aws_cloudfront_distribution.main.domain_name
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.main.name
}

output "aurora_endpoint" {
  value = aws_rds_cluster.main.endpoint
}

output "aurora_reader_endpoint" {
  value = aws_rds_cluster.main.reader_endpoint
}

output "db_password" {
  value     = random_password.db.result
  sensitive = true
}

output "s3_bucket_name" {
  value = aws_s3_bucket.static.id
}
