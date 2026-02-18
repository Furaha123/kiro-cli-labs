import boto3
from datetime import datetime, timedelta

region = 'us-east-1'
log_group = 'sampleapp-VPC-FlowLogs'

end_time = datetime.now()
start_time = end_time - timedelta(hours=1)

# Query to see actual log structure
query = """
fields @message
| limit 5
"""

client = boto3.client('logs', region_name=region)

response = client.start_query(
    logGroupName=log_group,
    startTime=int(start_time.timestamp()),
    endTime=int(end_time.timestamp()),
    queryString=query
)

query_id = response['queryId']

import time
while True:
    result = client.get_query_results(queryId=query_id)
    if result['status'] == 'Complete':
        break
    time.sleep(2)

for record in result['results']:
    for field in record:
        print(f"{field['field']}: {field['value']}")
    print("---")
