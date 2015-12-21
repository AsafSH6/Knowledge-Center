start mongod --dbpath=./dbfiles
TIMEOUT 2
mongoimport --db web-app --collection messages --drop --jsonArray --file messages.json
start node .\Server.js
TIMEOUT 2
taskkill /F /IM chrome.exe
start chrome.exe --allow-file-access-from-files \localhost:8080\screen_id=1
pause
