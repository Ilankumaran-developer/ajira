# ajira
A repo for ajira interview

Once you clone this repository, Install node modules by executing "npm install"
the command to start the server "node server"


please find the following sample  POSTman Requests 



PLEASE USE "node server.js withstub" COMMAND SO THAT ADJACENCY LIST WILL BE AUTOMATICALLY STUBBED


* Create Device

curl -X POST \
  http://localhost:8000/ajiranet/process \
  -H 'Postman-Token: c7d314eb-db42-4909-a777-ca084eb40e53' \
  -H 'cache-control: no-cache' \
  -d 'CREATE /devices
content-type : application/json

{"type" : "COMPUTER", "name" : "A1"}'


curl -X POST \
  http://localhost:8000/ajiranet/process \
  -H 'Postman-Token: c7d314eb-db42-4909-a777-ca084eb40e53' \
  -H 'cache-control: no-cache' \
  -d 'CREATE /devices
content-type : application/json


{"type" : "BRIDGE", "name" : "A3", "bridgeOp" : "UPPER"}'


* Create Connection

curl -X POST \
  http://localhost:8000/ajiranet/process \
  -H 'Postman-Token: 08cce8c5-f5a5-472e-9786-46ec12e8e1ae' \
  -H 'cache-control: no-cache' \
  -d 'CREATE /connections
content-type : application/json

{"source" : "A2", "targets" : ["A3"]}'


* Fetch routes


curl -X POST \
  http://localhost:8000/ajiranet/process \
  -H 'Postman-Token: 239bc218-985d-4f86-aab9-b6daa89aba03' \
  -H 'cache-control: no-cache' \
  -d 'FETCH /info-routes?from=A1&to=A3'


  * Modify strength

  curl -X POST \
  http://localhost:8000/ajiranet/process \
  -H 'Postman-Token: c60bdddc-7c12-418b-9b90-d3ac58b525bc' \
  -H 'cache-control: no-cache' \
  -d 'MODIFY /devices/A1/strength
content-type : application/json

{"value": 2}'

  * Send Message

  curl -X POST \
  http://localhost:8000/ajiranet/process \
  -H 'Postman-Token: f797d909-813c-4de0-9ca0-cc1f49af8bd0' \
  -H 'cache-control: no-cache' \
  -d 'SEND /message
content-type : application/json

{"from" : "A1", "to" : "A4", "message":"Hello"}'
