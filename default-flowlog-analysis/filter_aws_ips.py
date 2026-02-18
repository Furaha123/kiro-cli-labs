import json
import csv
import urllib.request

url = 'https://ip-ranges.amazonaws.com/ip-ranges.json'
with urllib.request.urlopen(url) as response:
    data = json.loads(response.read())

filtered = [p for p in data['prefixes'] 
            if p['region'] == 'us-east-1' and p['service'] != 'AMAZON']

with open('filtered_aws_ips.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['ip_prefix', 'region', 'service', 'network_border_group'])
    writer.writeheader()
    writer.writerows(filtered)

print(f"Filtered {len(filtered)} IP ranges to filtered_aws_ips.csv")
