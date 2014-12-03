#!/usr/bin/env python
from os import listdir
from os.path import isfile, join
from pprint import pprint
import json

def list_files(extension, path='.'):
    return [f for f in listdir(path) if isfile(join(path,f)) and f.endswith(extension)]

gifs = ['gifs/' + g for g in list_files('gif', './gifs/')]
pprint(gifs)

with open('./gifs/giflist.json', 'w') as gif_list:
    gif_list.write(json.dumps(gifs))
    gif_list.close()
