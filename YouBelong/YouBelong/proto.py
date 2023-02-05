from logger import putlog
import json
import os
import pandas as pd
import sqlite3

log = putlog(__file__)


def readFile(filename):
    content = ""

    try:
        with open(filename, 'r') as fileContent:
            content = fileContent.read()
    except Exception as Err:
        log.error("{}".format(Err))

    return content


def readJson(filename):
    content = {}

    try:
        content = json.loads(readFile(filename))
    except Exception as Err:
        log.error("{}".format(Err),exc_info=True)

    return content


def writeFile(filename, content):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    status = "success"
    try:
        with open(filename, 'w') as fileSource:
            fileSource.write(content)
    except Exception as Err:
        log.error("{}".format(Err))
        status = "failed"

    return status


def writeJson(filename, content):
    status = "Success"

    try:
        contentDump = json.dumps(content, indent=4, sort_keys=True)
        writeFile(filename, contentDump)
    except Exception as Err:
        log.error("{}".format(Err))
        status = "Failed"

    return status

configFile = "config/app.setting.json"
configuration = readJson(configFile)
#print(configuration["Database"]["Sqlite"]["DBPath"])

def readSqlite(query):
    conn = sqlite3.connect(configuration["Database"]["Sqlite"]["DBPath"])
    df = pd.read_sql_query(query, conn)
    return df




def executeSqlite(query):
    conn = sqlite3.connect(configuration["Database"]["Sqlite"]["DBPath"])
    try:
        conn.execute(query)
        conn.commit()
        conn.close()
        return 1
    except:
        return 0 
        
def quote_identifier(s, errors="strict"):
    encodable = s.encode("utf-8", errors).decode("utf-8")

    nul_index = encodable.find("\x00")

    if nul_index >= 0:
        error = UnicodeEncodeError("NUL-terminated utf-8", encodable,
                                   nul_index, nul_index + 1, "NUL not allowed")
        error_handler = codecs.lookup_error(errors)
        replacement, _ = error_handler(error)
        encodable = encodable.replace("\x00", replacement)

    return "\"" + encodable.replace("\"", "\"\"") + "\""