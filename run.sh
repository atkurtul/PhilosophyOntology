#!/usr/bin/bash
trap "kill 0" EXIT


export FLASK_APP=onto
python -m flask run &

cd onto-frontend
npm start

wait