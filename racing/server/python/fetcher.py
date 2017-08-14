# -*- coding: utf-8 -*-
#!/bin/python
import json
import logging
import urllib2
from pymongo import MongoClient
#logger = logging.getLogger(__name__)

url = "http://f.apiplus.net/bjpk10.json"
conn = MongoClient('localhost', 27017)
db = conn.racing_dev
table = db.lotterys
def fetchPk10():
    try:
        r = urllib2.urlopen(url).read()
        ret = json.loads(r)
        print(ret['code'])
        for item in ret['data']:
            queryDoc = {"no": item['expect']}
            updateDoc = {"no": item['expect'], "name":"北京赛车", "code": item['opencode'], "createdAt": item['opentime']}
            table.update(queryDoc, updateDoc, True)
    except Exception as e:
        print "请求失败", e
 #       logger.error(e)

if __name__=="__main__":
    fetchPk10()
