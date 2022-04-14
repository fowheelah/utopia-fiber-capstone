#!/usr/bin/python

import json
import requests
import sys
import datetime
import os
import psycopg2

#open current.json file on server
datestring = "/home/Scripts/jsonfiles/current.json"
open(datestring, 'w').close()

#create API call for PurpleAir API
url= 'https://api.purpleair.com/v1/sensors?fields=name,latitude,longitude,pm2.5_10minute,humidity,temperature,pressure&location_type=0&nwlng=-112.4&nwlat=41.74&selng=-111.55&selat=39.89'
headers = {'X-API-Key' : ##Insert API Key HERE}
r = requests.get(url, headers = headers)
files = r.json()
data_json = files['data']
fields = files['fields']
time = files['time_stamp']
data_time = files['data_time_stamp']
sensor = {"time_stamp":time, "data_time_stamp":data_time}
arr = []
#Parse data into JSON format	   
for x in range(len(data_json)):
	data = {}
	row = data_json[x]
	for y in range(len(fields)):
		data[fields[y]] = row[y]
	newKey = {'sensor_index':'sensor_index', 'name':'name', 'latitude':'latitude',
		'longitude':'longitude', 'pm2.5_10minute':'pm25', 'humidity':'humidity', 
		'temperature':'temperature', 'pressure':'pressure'}
	data = (dict([(newKey.get(key), value) for key, value in data.items()]))
	arr.append(data)
sensor["data"] = arr

with open(datestring, "w") as f:
	json.dump(sensor, f, indent=4, sort_keys=True)
#Open connection to database with enviornment variables
CONNECTION = "dbname=" + os.environ['DBNAME'] +" user=" + os.environ['DBUSER'] +" password=" + os.environ['DBPASS'] +" host=" + os.environ['DBIP'] + " port=" + os.environ['DBPORT'] + " sslmode=require"
conn = psycopg2.connect(CONNECTION)
cursor = conn.cursor()
file = open(datestring)
content = json.load(file)
data = content['data']
time = content['data_time_stamp']
updatedTimestamp = datetime.datetime.fromtimestamp(int(time)).strftime('%Y-%m-%d %H:%M:%S')
print(updatedTimestamp + " -07:00")

#insert data into database	   
for x in data:
	sensor_index = x['sensor_index']
	sensor_name = x['name']
	sensor_name = sensor_name.replace("'", "''")
	sensor_name = sensor_name.replace("\xa0", " ")
	if sensor_name is None:
		sensor_name = "Null"
	latitude = x['latitude']
	longitude = x['longitude']
	try:
		pm25 = x['pm25']
	except:
		pm25 = x['pm2.5_10minute']
	humidity = x['humidity']
	if humidity is None:
		humidity = "Null"
	temperature = x['temperature']
	if temperature is None:
		temperature = "Null"
	pressure = x['pressure']
	if pressure is None:
		pressure = "Null"		

	cursor.execute("SELECT location_id FROM location WHERE sensor_index = {};".format(sensor_index))
	locationID = cursor.fetchone()
		
	if locationID is None:
		insertLocation = "INSERT INTO location (sensor_index, sensor_name, latitude, longitude) VALUES ({}, '{}', {}, {});".format(sensor_index, sensor_name, latitude, longitude)
		print(insertLocation)
		cursor.execute(insertLocation)
		conn.commit()
			
	cursor.execute("SELECT location_id FROM location WHERE sensor_index = {};".format(sensor_index))
	locationID = cursor.fetchone()

	#print(locationID)

	insertTemperature = "INSERT INTO temperature VALUES ('{}', {}, {});".format(updatedTimestamp, locationID[0], temperature)
	insertHumidity= "INSERT INTO humidity VALUES ('{}', {}, {});".format(updatedTimestamp, locationID[0], humidity)
	insertAirPressure = "INSERT INTO air_pressure VALUES ('{}', {}, {});".format(updatedTimestamp, locationID[0], pressure)
	insertAirQuality = "INSERT INTO air_quality VALUES ('{}', {}, {});".format(updatedTimestamp, locationID[0], pm25)

	cursor.execute(insertTemperature)
	conn.commit()
	cursor.execute(insertHumidity)
	conn.commit()
	cursor.execute(insertAirPressure)
	conn.commit()
	cursor.execute(insertAirQuality)
	conn.commit()
	
file.close()
cursor.close()
conn.close()
