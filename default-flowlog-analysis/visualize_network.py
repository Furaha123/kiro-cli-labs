import csv
from collections import defaultdict
import graphviz

# Aggregate traffic by src->dst
edges = defaultdict(int)
nodes = {}

with open('traffic_tagged.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        src = row['srcaddr']
        dst = row['dstaddr']
        bytes_val = int(row['bytes'])
        
        nodes[src] = row['srcaddr_tag']
        nodes[dst] = row['dstaddr_tag']
        edges[(src, dst)] += bytes_val

# Group nodes by tag
tags = defaultdict(list)
for ip, tag in nodes.items():
    tags[tag].append(ip)

# Create graph
dot = graphviz.Digraph(comment='Network Traffic', format='png')
dot.attr(rankdir='LR')

# Add nodes grouped by tag
for tag, ips in tags.items():
    with dot.subgraph(name=f'cluster_{tag}') as c:
        c.attr(label=tag, style='filled', color='lightgrey')
        for ip in ips:
            c.node(ip, ip)

# Add edges
max_bytes = max(edges.values())
for (src, dst), bytes_val in edges.items():
    width = 0.5 + (bytes_val / max_bytes) * 5
    label = f"{bytes_val:,}"
    dot.edge(src, dst, label=label, penwidth=str(width))

dot.render('network_traffic', cleanup=True)
print(f"Visualization saved to network_traffic.png")
print(f"Groups: {dict((k, len(v)) for k, v in tags.items())}")
