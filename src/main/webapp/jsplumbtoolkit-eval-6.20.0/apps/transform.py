import os
import json
import copy 

def transform2():
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

def transform3():
    files = os.listdir('./transformed_data2')
    for file in files:
        if not file.endswith('.json'):
            continue
        
        with open('./transformed_data2/' + file,'r') as f:
            j = json.load(f)
            for node in j['nodes']:
                label = node['label']
                group = node['group']
                id = str(node['id'])
                node['label'] = f'{id}. {label}'
                node.pop('group', None)
                node['group_mine'] = group
        with open('./transformed_data3/' + file,'w') as f:
            json.dump(j,f,indent=4)

# transform3()

def singleTransform(file):
    # file = 'graph-spring-framework-357beb24bce72b20aed3a774b4eddc42e3f098f2.json'

    with open('./data/' + file,'r') as f:
        j = json.load(f)

            # edge.pop('link_type_str', None)
            # edge.pop('code', None)
            # edge.pop('file_name', None)
            # edge.pop('text', None)
            # edge.pop('source2', None)
            # edge.pop('type', None)
            # edge.pop('target2', None)
            # edge.pop('value', None)


    # with open(f'./transformed_data2/{file}','w') as f:
        # json.dump(j,f,indent=4)
        
    # with open('./transformed_data2/' + file,'r') as f:
        # j = json.load(f)
    for node in j['nodes']:
        label = node['label']
        group = node['group']
        id = str(node['id'])
        node['label'] = f'{id}. {label}'
        node.pop('group', None)
        node['group_mine'] = group
    with open('./transformed_data3/' + file,'w') as f:
        json.dump(j,f,indent=4)


# singleTransform('graph-rocketmq-d8c446e854e6cce1b54c0d9d97f3189832b88001.json')
# singleTransform('graph-spring-framework-773b2f06a10679979ee747ad2ee2182eaafcc8cd.json')
# singleTransform('graph-spring-framework-4882dfcc0d6d0bde167c722cb82d899414fb1209.json')
# singleTransform('graph-spring-framework-046380988b9f98bed43fad1943c8f10f6a1429de.json')

def transform4():
    # {'def-use@method', 'def-use@class', 'def-use@taicu', 'defUseField', 'defUse', 'def-use', 'defUseMethod', 'defUseTaicu', 'def-use@field', 'systematic'}
    linktype = set()
    files = os.listdir('./transformed_data3')
    data = {
        "color":"cadetblue",
        "lineWidth":2,
        "outlineColor":"pink",
        "outlineWidth":2,
        "label":"XX"  
    }
    dic =  {
        'def-use@method': "M\ndef-use", 
        'def-use@class': "C\ndef-use", 
        'def-use@taicu': "def-use",
        'defUseField': "F\ndef-use", 
        'defUse': "def-use",
        'def-use': "def-use" ,
        'defUseMethod': "M\ndef-use",
        'defUseTaicu': "def-use",
        'def-use@field': "F\ndef-use",
        'systematic': "similar"
    }
    for file in files:
        with open('./transformed_data3/' + file, 'r') as f:
            j = json.load(f)
            for edge in j['edges']:
                t = edge['text']
                edge['data'] = copy.copy(data)
                edge['data']['label'] = dic[t]
        with open('./transformed_data4/' + file, 'w') as f:
            json.dump(j, f, indent=4)

transform4()


