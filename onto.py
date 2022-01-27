
from flask import Flask
from flask import session
from flask_cors import CORS, cross_origin
from owlready2 import *
from owlready2.sparql.endpoint import *
import urllib

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

onto = owlready2.get_ontology("https://raw.githubusercontent.com/atkurtul/onto/main/philosophy.owl").load()

def create_class(name, super_class):
  with onto:
    new_class = types.new_class(name, (super_class,) )
    return new_class

def create_individual(name, class_name):
  return onto[class_name](name)

def create_rule(rule):
  imp = Imp()
  imp.set_as_rule(rule)
  return imp


# See also: https://pythonbasics.org/flask-tutorial-routes/

@app.route("/create_rule/<rule_data>", methods=['GET', 'POST'])
@cross_origin()
def create_rule(rule_data):
    print("Creating rule: " + rule_data)
    return "Created"

@app.route("/create_class/<super_class>/<name>", methods=['GET', 'POST'])
@cross_origin()
def create_class(super_class, name):
    print("Creating class:", super_class, name)
    return "Created"

@app.route("/create_indiv/<class_>/<name>", methods=['GET', 'POST'])
@cross_origin()
def create_indiv(class_, name):
    print("Creating indiv:", class_, name)
    return "Created"

@app.route("/query/<qstr>", methods=['GET', 'POST'])
@cross_origin()
def query(qstr):
    print(f"""{qstr}""")
    return str(list(default_world.sparql(qstr)))

@app.route("/get_rules", methods=['GET', 'POST'])
@cross_origin()
def get_rules():
    return str(list(onto.rules()))

@app.route("/get_classes", methods=['GET', 'POST'])
@cross_origin()
def get_classes():
    return str(list(onto.classes()))

@app.route("/get_individuals", methods=['GET', 'POST'])
@cross_origin()
def get_individuals():
    return str(list(onto.individuals()))
