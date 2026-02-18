import csv
import ipaddress

# Load VPC CIDR
vpc_cidr = ipaddress.ip_network('10.0.0.0/16')

# Load AWS service IPs
aws_ips = {}
with open('filtered_aws_ips.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        aws_ips[ipaddress.ip_network(row['ip_prefix'])] = row['service']

def tag_ip(ip_str):
    try:
        ip = ipaddress.ip_address(ip_str)
        if ip in vpc_cidr:
            return 'VPC'
        for network, service in aws_ips.items():
            if ip in network:
                return service
        return 'Internet'
    except:
        return 'Unknown'

# Process traffic table
with open('traffic_table.csv', 'r') as fin, open('traffic_tagged.csv', 'w', newline='') as fout:
    reader = csv.DictReader(fin)
    fieldnames = reader.fieldnames + ['srcaddr_tag', 'dstaddr_tag']
    writer = csv.DictWriter(fout, fieldnames=fieldnames)
    writer.writeheader()
    
    for row in reader:
        row['srcaddr_tag'] = tag_ip(row['srcaddr'])
        row['dstaddr_tag'] = tag_ip(row['dstaddr'])
        writer.writerow(row)

print("Tagged traffic written to traffic_tagged.csv")
