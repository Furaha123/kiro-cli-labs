import boto3
import os

ec2 = boto3.client('ec2', region_name='us-east-1')

def lambda_handler(event, context):
    action = os.environ['ACTION']
    
    instances = ec2.describe_instances(
        Filters=[
            {'Name': 'tag:Name', 'Values': ['*sampleapp-load-generator*']},
            {'Name': 'instance-state-name', 'Values': ['running' if action == 'stop' else 'stopped']}
        ]
    )
    
    instance_ids = [i['InstanceId'] for r in instances['Reservations'] for i in r['Instances']]
    
    if instance_ids:
        if action == 'start':
            ec2.start_instances(InstanceIds=instance_ids)
        else:
            ec2.stop_instances(InstanceIds=instance_ids)
        return {'statusCode': 200, 'body': f'{action}ed {len(instance_ids)} instances'}
    
    return {'statusCode': 200, 'body': 'No instances found'}
