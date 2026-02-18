# AWS Architecture Terraform

This Terraform configuration deploys the AWS architecture with:
- VPC with public/private subnets across 2 AZs
- Application Load Balancer in public subnets
- ECS Fargate cluster running containerized application
- Aurora MySQL cluster in private subnets
- CloudFront CDN with S3 for static assets
- Route 53 (manual setup required)
- ACM certificate (manual setup required)

## Prerequisites

1. AWS CLI configured with appropriate credentials
2. Terraform >= 1.0
3. Container image pushed to ECR

## Usage

```bash
cd terraform

# Initialize Terraform
terraform init

# Review the plan
terraform plan

# Apply the configuration
terraform apply

# Get outputs
terraform output

# Get sensitive outputs (DB password)
terraform output -json db_password
```

## Manual Steps Required

1. **Route 53**: Create a hosted zone and add DNS records pointing to CloudFront
2. **ACM Certificate**: Request a certificate for your domain and add to ALB listener
3. **Container Image**: Ensure the ECR image exists and is accessible
4. **Database Password**: Store the generated password in AWS Secrets Manager

## Outputs

- `alb_dns_name`: ALB endpoint for testing
- `cloudfront_domain`: CloudFront distribution domain
- `aurora_endpoint`: Database writer endpoint
- `db_password`: Database master password (sensitive)

## Cost Considerations

This setup includes:
- 2 NAT Gateways (~$65/month)
- 2 Aurora instances (~$300/month for db.r6g.large)
- 4 ECS Fargate tasks (~$100/month)
- ALB (~$20/month)
- CloudFront (pay per use)

## Cleanup

```bash
terraform destroy
```
