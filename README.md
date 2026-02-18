# EC2 Instance Scheduler

Automates starting and stopping EC2 instances with names containing 'sampleapp-load-generator' in us-east-1 based on Bangkok business hours (9 AM - 5 PM, Mon-Fri).

## Schedule

- **Start**: 9:00 AM Bangkok time (2:00 AM UTC) - Monday to Friday
- **Stop**: 5:00 PM Bangkok time (10:00 AM UTC) - Monday to Friday

## Deployment

```bash
aws cloudformation deploy \
  --template-file scheduler-stack.yaml \
  --stack-name ec2-scheduler \
  --capabilities CAPABILITY_IAM \
  --region us-east-1
```

## Manual Testing

Start instances:
```bash
aws lambda invoke --function-name ec2-scheduler-start --region us-east-1 response.json
```

Stop instances:
```bash
aws lambda invoke --function-name ec2-scheduler-stop --region us-east-1 response.json
```

## Cleanup

```bash
aws cloudformation delete-stack --stack-name ec2-scheduler --region us-east-1
```
