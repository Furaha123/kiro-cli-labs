# Sudoku App Infrastructure

This Terraform configuration deploys the Sudoku web application to AWS using:
- **Amazon S3** - Private bucket for hosting static files
- **Amazon CloudFront** - CDN for secure content delivery with HTTPS

## Architecture

```
User → CloudFront (HTTPS) → S3 Private Bucket
```

CloudFront uses Origin Access Control (OAC) to securely access the private S3 bucket.

## Infrastructure Resources

The Terraform plan will create the following AWS resources:

- **S3 Bucket** - Private bucket with versioning enabled
- **S3 Bucket Public Access Block** - Ensures bucket remains private
- **S3 Bucket Policy** - Allows CloudFront to access bucket objects
- **S3 Objects** (3) - sudoku.html, style.css, script.js
- **CloudFront Origin Access Control** - Secure access to S3
- **CloudFront Distribution** - CDN with HTTPS redirect
- **Random ID** - Unique bucket name suffix

**Total Resources: 9**

## Prerequisites

- AWS CLI configured with credentials
- Terraform >= 1.0 installed

## Deployment

1. Initialize Terraform:
```bash
cd terraform
terraform init
```

2. Review the plan:
```bash
terraform plan
```

3. Deploy the infrastructure:
```bash
terraform apply
```

4. Access your website using the CloudFront URL from the output:
```bash
terraform output website_url
```

## Update Website Content

After modifying HTML, CSS, or JS files:

```bash
terraform apply
```

To invalidate CloudFront cache for immediate updates:
```bash
aws cloudfront create-invalidation \
  --distribution-id $(terraform output -raw cloudfront_distribution_id) \
  --paths "/*"
```

## Cleanup

To destroy all resources:
```bash
terraform destroy
```

## Configuration

Edit `variables.tf` to customize:
- `aws_region` - AWS region (default: us-east-1)
- `project_name` - Project name for resource naming (default: sudoku-app)

## Outputs

- `s3_bucket_name` - S3 bucket name
- `cloudfront_distribution_id` - CloudFront distribution ID
- `cloudfront_domain_name` - CloudFront domain
- `website_url` - Full HTTPS URL to access the website
