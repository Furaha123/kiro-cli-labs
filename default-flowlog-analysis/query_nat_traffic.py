import boto3
import csv
from datetime import datetime, timedelta

region = 'us-east-1'
log_group = 'sampleapp-VPC-FlowLogs'
nat_eni = 'eni-08b5f63a506396878'

end_time = datetime.now()
start_time = end_time - timedelta(hours=1)

# Parse the space-delimited log format
query = f"""
fields @timestamp, @message
| filter @message like /{nat_eni}/
| parse @message /(?<version>\\S+) (?<account_id>\\S+) (?<interface_id>\\S+) (?<srcaddr>\\S+) (?<dstaddr>\\S+) (?<srcport>\\S+) (?<dstport>\\S+) (?<protocol>\\S+) (?<packets>\\S+) (?<bytes>\\S+) (?<start>\\S+) (?<end>\\S+) (?<action>\\S+) (?<log_status>\\S+)/
| sort bytes desc
| limit 50
"""

client = boto3.client('logs', region_name=region)

response = client.start_query(
    logGroupName=log_group,
    startTime=int(start_time.timestamp()),
    endTime=int(end_time.timestamp()),
    queryString=query
)

query_id = response['queryId']
print(f"Query started: {query_id}")

import time
while True:
    result = client.get_query_results(queryId=query_id)
    status = result['status']
    print(f"Query status: {status}")
    
    if status == 'Complete':
        break
    elif status in ['Failed', 'Cancelled']:
        print(f"Query failed: {status}")
        exit(1)
    
    time.sleep(2)

results = result['results']
print(f"Found {len(results)} records")

# Write to CSV
with open('traffic_table.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['timestamp', 'interface_id', 'srcaddr', 'dstaddr', 'srcport', 'dstport', 'protocol', 'packets', 'bytes', 'action'])
    
    for record in results:
        row_dict = {field['field']: field['value'] for field in record}
        writer.writerow([
            row_dict.get('@timestamp', ''),
            row_dict.get('interface_id', ''),
            row_dict.get('srcaddr', ''),
            row_dict.get('dstaddr', ''),
            row_dict.get('srcport', ''),
            row_dict.get('dstport', ''),
            row_dict.get('protocol', ''),
            row_dict.get('packets', ''),
            row_dict.get('bytes', ''),
            row_dict.get('action', '')
        ])

print(f"Results written to traffic_table.csv")
