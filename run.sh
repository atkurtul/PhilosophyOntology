#!/usr/bin/bash
trap "kill 0" EXIT

pip install owlready2 flask flask_cors

export FLASK_APP=onto
python -m flask run &

cd onto-frontend
npm install
npm start

wait