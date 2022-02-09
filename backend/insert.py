#!/usr/bin/python3
# -*- coding: utf-8 -*-

# import the psycopg2 database adapter for PostgreSQL
from psycopg2 import connect, Error

# import Python's built-in JSON library
import json

# import the JSON library from psycopg2.extras
from psycopg2.extras import Json

# import psycopg2's 'json' using an alias
from psycopg2.extras import json as psycop_json

# import Python's 'sys' library
import sys

# accept command line arguments for the Postgres table name
if len(sys.argv) > 1:
    table_name = '_'.join(sys.argv[1:])
else:
    # ..otherwise revert to a default table name
    table_name = "json_data"

print ("\ntable name for JSON data:", table_name)

# use Python's open() function to load the JSON data
with open('postgres-records.json') as json_data:

    # use load() rather than loads() for JSON files
    record_list = json.load(json_data)

print ("\nrecords:", record_list)
print ("\nJSON records object type:", type(record_list)) # should return "<class 'list'>"

# concatenate an SQL string
sql_string = 'INSERT INTO {} '.format( table_name )

# if record list then get column names from first key
if type(record_list) == list:
    first_record = record_list[0]

    columns = list(first_record.keys())
    print ("\ncolumn names:", columns)

# if just one dict obj or nested JSON dict
else:
    print ("Needs to be an array of JSON objects")
    sys.exit()

# enclose the column names within parenthesis
sql_string += "(" + ', '.join(columns) + ")\nVALUES "

# enumerate over the record
for i, record_dict in enumerate(record_list):

    # iterate over the values of each record dict object
    values = []
    for col_names, val in record_dict.items():

        # Postgres strings must be enclosed with single quotes
        if type(val) == str:
            # escape apostrophies with two single quotations
            val = val.replace("'", "''")
            val = "'" + val + "'"

        values += [ str(val) ]

    # join the list of values and enclose record in parenthesis
    sql_string += "(" + ', '.join(values) + "),\n"

# remove the last comma and end statement with a semicolon
sql_string = sql_string[:-2] + ";"

print ("\nSQL string:")
print (sql_string)

try:
    # declare a new PostgreSQL connection object
    conn = connect(
        dbname = "python_data",
        user = "postgres",
        host = "192.168.100.123",
        password = "1234",
        # attempt to connect for 3 seconds then raise exception
        connect_timeout = 3
    )

    cur = conn.cursor()
    print ("\ncreated cursor object:", cur)
    # only attempt to execute SQL if cursor is valid
    if cur != None:

        try:
            cur.execute( sql_string )
            conn.commit()
            print ('\nfinished INSERT INTO execution')

        except (Exception, Error) as error:
            print("\nexecute_sql() error:", error)
            conn.rollback()

        # close the cursor and connection
        cur.close()
        conn.close()

except (Exception, Error) as err:
    print ("\npsycopg2 connect error:", err)
    conn = None
    cur = None

