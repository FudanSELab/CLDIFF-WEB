import os
import json


files = os.listdir('./data')

for file in files:
    if not file.endswith('.json'):
        continue
    
    with open('./data/' + file,'r') as f:
        j = json.load(f)

    type_list = ['basic.source','transform.overlay','input.number','filter.invert','math.add']
    for node in j['nodes']:
        node['label'] = node['desc']
        node['left'] = 200
        node['id'] = str(node['id'])
        node['top']  = 200
        node['url']  = 'url'
        node['type'] = type_list [node['group'] % 4]
        # node.pop('desc', None)
        # node.pop('group', None)
        # node.pop('code', None)
        # node.pop('file_name', None)
    for edge in j['edges']:
        edge['source2'] = edge['source']
        edge['target2'] = edge['target']
        edge['source'] = str(edge['source2']) + '.out:conr'
        edge['target'] = str(edge['target2']) + '.in:conl'

        # edge.pop('link_type_str', None)
        # edge.pop('code', None)
        # edge.pop('file_name', None)
        # edge.pop('text', None)
        # edge.pop('source2', None)
        # edge.pop('type', None)
        # edge.pop('target2', None)
        # edge.pop('value', None)

    with open(f'./transformed_data2/{file}','w') as f:
        json.dump(j,f,indent=4)