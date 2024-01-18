# inventory_system

//How to run the project
1. Make sure you have node installed your laptop
2. Create DATABASE inventoryDB using mysql on your local PC
3. I used vscode to run the codes
4. In vscode after importing the folder with the code do the following:
    A. npm init
    B. install all dependences listed in packages.json using 'npm i dependence(s)'
    C. Go to .example.env and edit to put your DATABASE name, username and password then copy this file to .env
    D. Connect to your database and create a role manually with the name "admin"
    E. On vscode terminal run 'mpm run dev'
    F. On your browser go to "localhost:5000"
    G. Register and login
    
Notices: 
1. You can only register as a user once in roles table we have role name 'admin'
2. Employee depends on department, so you must have department first
3. Devices depends on Device_types, so you must have device_types first
4. Assignment depends on both employees and devices

