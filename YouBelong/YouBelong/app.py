from flask import Flask, jsonify, render_template, request
from flask_compress import Compress
from flask_cors import CORS
from proto import *
import datetime



app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

Compress(app)
CORS(app, resource={"/*": {"origins": "*"}})

log = putlog("MainExecutor")

configFile = "config/app.setting.json"
configuration = readJson(configFile)

monthDict = {"01": "January", "02": "February", "03": "March", "04": "April", "05": "May", "06": "June", "07": "July", "08": "August", "09": "September", "10": "October", "11": "November", "12": "December"}


@app.route('/getdata/<inputType>', methods = ['POST', 'GET'])
def getdata(inputType):
    result = ""
    try:
        if inputType == "donation":
            query = "SELECT * FROM Donation"
        elif inputType == "event":
            query = "SELECT * FROM Event"
        elif inputType == "jobs":
            query = "SELECT * FROM Skills"
        elif inputType == "pals":
            query = "SELECT * FROM FindPal"
        else:
            query = ""
        df = readSqlite(query)
        result = df.to_json(orient="records")
        return jsonify(json.loads(result))
    except:
        return ""
    
@app.route('/putdata/', methods = ['POST', 'GET'])
def putdata():
    if request.method == 'POST':
        data = request.get_json()
        
    if data:
        if data["type"] == "donation":
            query = "INSERT INTO Donation ('dname', 'title','description', 'status') VALUES ({}, {}, {}, {}) ".format(quote_identifier(data["dname"]),quote_identifier(data["title"]),quote_identifier(data["description"]),quote_identifier(data["status"]))
        elif data["type"] == "event":
            monthinteger = data["edate"][5:7]
            dayinteger = data["edate"][8:10]
            month = monthDict[monthinteger]
            query = "INSERT INTO Event ('ename', 'edescription','host', 'edate') VALUES ({}, {}, {}, {}) ".format(quote_identifier(data["ename"]), quote_identifier(data["edescription"]), quote_identifier(data["host"]), quote_identifier(str(dayinteger)+" "+month))
        elif data["type"] == "jobs":
            query = "INSERT INTO Skills ('title', 'skillDescription','pay', 'status','sname') VALUES ({}, {}, {}, {}, {}) ".format(quote_identifier(data["title"]),quote_identifier(data["skillDescription"]), quote_identifier(data["pay"]), quote_identifier(data["status"]), quote_identifier(data["sname"]))
        elif data["type"] == "pals":
            query = "INSERT INTO FindPal ('pname', 'age','activity','palage') VALUES ({}, {}, {},{}) ".format(quote_identifier(data["pname"]),quote_identifier(data["activity"]))
        else:
            query = ""
            
        status = executeSqlite(query)
        
        if status==1:
            if data["type"] == "jobs":
                query = "SELECT * from Skills WHERE sname={}".format(quote_identifier(data["sname"]))
                df = readSqlite(query)
                result = df.to_json(orient="records")
            elif data["type"] == "donation":
                query = "SELECT * from Donation WHERE dname={}".format(quote_identifier(data["dname"]))
                df = readSqlite(query)
                result = df.to_json(orient="records")
                return jsonify(json.loads(result))
            else:
                result = jsonify("success")
        else:
            result = "failed"
        
        
    return result


if __name__ == "__main__":
    if configuration["App"]["Mode"] == 0:
        app.run(host=configuration["App"]["Host"],
                port=configuration["App"]["Port"],
                debug=True,
                threaded=True)
