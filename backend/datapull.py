#!/usr/bin/python

import json
import requests
import sys
import datetime;

url = 'https://api.purpleair.com/v1/sensors?fields=name&location_type=0&nwlng=-112.4&nwlat=41.74&selng=-111.55&selat=39.98'

headers = {
	'X-API-Key' : 'A27D8E70-260B-11EC-BAD6-42010A800017'
	}
	
r = requests.get(url, headers = headers)

files = r.json()

date = datetime.datetime.now()

datestring = "datafiles/" + date.strftime("%m")
datestring += "-" + date.strftime("%d") + "-" + date.strftime("%Y") + "-" + date.strftime("%X")
datestring += ".txt"

with open(datestring, "w") as f:
	print(files, file=f)

