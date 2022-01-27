
from owlready2 import *
from owlready2.sparql.endpoint import *

onto = owlready2.get_ontology("https://raw.githubusercontent.com/atkurtul/onto/main/philosophy.owl").load()

with onto:
  rule = Imp()
  rule.set_as_rule("""Book(?x), written_by(?x, ?y) -> Philosopher(?y)""")

for c  in list(onto.classes()):
  print(c)

for rule in list(onto.rules()):
  print(rule)

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

print(list(default_world.sparql("""SELECT (COUNT(?x) AS ?__) { ?x a owl:Class . } """)))
print(list(default_world.sparql("""SELECT (COUNT(?x) AS ?__) { ?x a owl:NamedIndividual . } """)))

print(list(default_world.sparql("""
           SELECT ?x { ?x a owl:ObjectProperty . }
    """)))

# print(list(default_world.sparql("""
#       SELECT ?x { 
#         ?x rdf:about="http://www.semanticweb.org/atil.kurtulmus/ontologies/2022/0/untitled-ontology-2#Philosopher" .
#       }
#     """)))
