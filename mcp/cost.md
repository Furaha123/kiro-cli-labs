# AWS Architecture Cost Estimate

**Project:** mywebapp  
**Environment:** prod  
**Region:** us-east-1  
**Pricing Model:** ON DEMAND  
**Estimate Date:** February 2026

---

## Monthly Cost Breakdown

### Compute - ECS Fargate
- **Service:** AWS Fargate
- **Configuration:** 4 tasks × 2 vCPU, 256 MB memory
- **Usage:** 730 hours/month (continuous)
- **Unit Pricing:**
  - vCPU: $0.04048 per vCPU-hour
  - Memory: $0.004445 per GB-hour
- **Calculation:**
  - vCPU cost: 4 tasks × 2 vCPU × 730 hours × $0.04048 = $236.40
  - Memory cost: 4 tasks × 0.25 GB × 730 hours × $0.004445 = $3.25
- **Monthly Cost:** $239.65

### Database - Aurora MySQL
- **Service:** Amazon Aurora MySQL
- **Configuration:** 2 × db.r6g.large instances
- **Engine:** MySQL 8.0
- **Storage:** 50 GB
- **Unit Pricing:**
  - Instance: $0.29 per hour (db.r6g.large)
  - Storage: $0.10 per GB-month
  - I/O: $0.20 per 1M requests (estimated 10M/month)
- **Calculation:**
  - Instance cost: 2 instances × 730 hours × $0.29 = $423.40
  - Storage cost: 50 GB × $0.10 = $5.00
  - I/O cost: 10M requests × $0.20 = $2.00
- **Monthly Cost:** $430.40

### Load Balancing - Application Load Balancer
- **Service:** Elastic Load Balancing (ALB)
- **Configuration:** 1 ALB in 2 AZs
- **Unit Pricing:**
  - ALB hour: $0.0225 per hour
  - LCU: $0.008 per LCU-hour (estimated 10 LCUs average)
- **Calculation:**
  - ALB cost: 730 hours × $0.0225 = $16.43
  - LCU cost: 730 hours × 10 LCUs × $0.008 = $58.40
- **Monthly Cost:** $74.83

### Networking - NAT Gateway
- **Service:** NAT Gateway
- **Configuration:** 2 NAT Gateways (one per AZ)
- **Data Transfer:** Estimated 100 GB/month
- **Unit Pricing:**
  - NAT Gateway hour: $0.045 per hour
  - Data processing: $0.045 per GB
- **Calculation:**
  - Gateway cost: 2 gateways × 730 hours × $0.045 = $65.70
  - Data processing: 100 GB × $0.045 = $4.50
- **Monthly Cost:** $70.20

### Content Delivery - CloudFront
- **Service:** Amazon CloudFront
- **Data Transfer:** Estimated 500 GB/month to internet
- **Requests:** Estimated 10M HTTPS requests/month
- **Unit Pricing:**
  - Data transfer (first 10 TB): $0.085 per GB
  - HTTPS requests: $0.010 per 10,000 requests
- **Calculation:**
  - Data transfer: 500 GB × $0.085 = $42.50
  - Requests: (10M / 10,000) × $0.010 = $10.00
- **Monthly Cost:** $52.50

### Storage - S3
- **Service:** Amazon S3 Standard
- **Storage:** Estimated 100 GB
- **Requests:** Estimated 1M GET requests/month
- **Unit Pricing:**
  - Storage: $0.023 per GB-month
  - GET requests: $0.0004 per 1,000 requests
- **Calculation:**
  - Storage: 100 GB × $0.023 = $2.30
  - Requests: (1M / 1,000) × $0.0004 = $0.40
- **Monthly Cost:** $2.70

### Networking - Data Transfer
- **Service:** EC2 Data Transfer
- **Configuration:** Inter-AZ data transfer (estimated 50 GB/month)
- **Unit Pricing:** $0.01 per GB
- **Calculation:** 50 GB × $0.01 = $0.50
- **Monthly Cost:** $0.50

### Monitoring - CloudWatch
- **Service:** CloudWatch Logs
- **Configuration:** 10 GB logs ingestion, 7-day retention
- **Unit Pricing:**
  - Ingestion: $0.50 per GB
  - Storage: $0.03 per GB-month
- **Calculation:**
  - Ingestion: 10 GB × $0.50 = $5.00
  - Storage: 10 GB × $0.03 = $0.30
- **Monthly Cost:** $5.30

---

## Total Monthly Cost Summary

| Service | Monthly Cost |
|---------|--------------|
| ECS Fargate | $239.65 |
| Aurora MySQL | $430.40 |
| Application Load Balancer | $74.83 |
| NAT Gateway | $70.20 |
| CloudFront CDN | $52.50 |
| S3 Storage | $2.70 |
| Data Transfer | $0.50 |
| CloudWatch Logs | $5.30 |
| **TOTAL** | **$876.08** |

---

## Annual Cost Estimate

**Total Annual Cost:** $10,513.00

---

## Cost Optimization Recommendations

### Immediate Savings
1. **NAT Gateway Optimization** - Consider using a single NAT Gateway instead of 2 to save ~$35/month (reduces high availability)
2. **Aurora Serverless v2** - Switch to Aurora Serverless v2 for variable workloads, potential 30-50% savings during low-traffic periods
3. **Fargate Spot** - Use Fargate Spot for non-critical tasks, save up to 70% on compute costs
4. **Reserved Instances** - Commit to 1-year reserved capacity for Aurora to save ~30% ($129/month savings)

### Long-term Optimization
1. **CloudFront Caching** - Optimize cache hit ratio to reduce origin requests and ALB costs
2. **S3 Lifecycle Policies** - Move infrequently accessed objects to S3 Intelligent-Tiering
3. **Right-sizing** - Monitor actual resource usage and adjust:
   - ECS task memory (currently 256 MB may be oversized)
   - Aurora instance size (db.r6g.large may be oversized for initial workload)
4. **Savings Plans** - Consider Compute Savings Plans for 1-3 year commitment (up to 66% savings)

### Potential Monthly Savings
- **Conservative optimization:** $150-200/month (17-23% reduction)
- **Aggressive optimization:** $300-400/month (34-46% reduction)

---

## Assumptions

1. **Uptime:** 100% uptime (730 hours/month) for all services
2. **Traffic:** Moderate traffic levels with 500 GB CloudFront transfer
3. **Database:** 50 GB storage with moderate I/O operations
4. **Data Transfer:** 100 GB NAT Gateway processing, 50 GB inter-AZ transfer
5. **Logs:** 10 GB CloudWatch logs per month with 7-day retention
6. **No Free Tier:** Assumes account has exhausted free tier benefits

## Exclusions

- Route 53 hosted zone ($0.50/month) and query charges
- ACM certificates (free for public certificates)
- AWS Support plans
- Data transfer costs to/from internet beyond CloudFront
- Backup storage costs beyond 7-day retention
- Additional CloudWatch metrics and alarms
- Secrets Manager for database credentials (~$0.40/month per secret)
- Development and testing environments

---

## Notes

- Prices based on us-east-1 region standard ON DEMAND rates
- Actual costs may vary based on usage patterns and traffic
- Consider using AWS Cost Explorer and AWS Budgets for real-time tracking
- Review AWS Pricing Calculator (https://calculator.aws) for detailed estimates
