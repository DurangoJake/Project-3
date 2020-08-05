from flask import Flask, render_template, jsonify
import sqlalchemy
import numpy as np
from sqlalchemy.ext.automap import automap_base 
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, MetaData

app = Flask(__name__)   
engine = create_engine("postgresql://postgres:postgres@127.0.0.1:5432/COForestFires")
m = MetaData()
Base = automap_base(bind=engine, metadata = m)
Base.prepare(engine, reflect=True)

print(Base.metadata.tables)
print(Base.classes.keys())

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/table')
def table():
    return render_template('table.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/map')
def map():
    return render_template('map.html')


@app.route('/api/fires')
def fire():
    data=[];
    results=engine.execute("select * from colofires")
    for row in results:
        d = {
            "index": row[0],
            "FIRE_NAME": row[1],
            "SOURCE_REPORTING_UNIT_NAME": row[2],
            "FIRE_YEAR": row[3],
            "FIRE_SIZE": row[4],
            "LATITUDE": row[5],
            "LONGITUDE": row[6],
            "STATE":row[7]

        }
        data.append(d)
    return jsonify(data)




if __name__ == "__main__":
    app.run(debug=True)
