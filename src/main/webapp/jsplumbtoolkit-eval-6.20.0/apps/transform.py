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
        node.pop('desc', None)
        node['type'] = type_list [node['group'] % 4]
    for edge in j['edges']:
        edge['source2'] = edge['source']
        edge['target2'] = edge['target']
        edge['source'] = str(edge['source2']) + '.out:conr'
        edge['target'] = str(edge['target2']) + '.in:conl'

    with open(f'./transformed_data/{file}','w') as f:
        json.dump(j,f,indent=4)