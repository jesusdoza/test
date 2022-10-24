# Repair-Reports
Database for circuit board repairs that can be searched so problems that have already been resolved are not reworked 

will primarily be used on mobile to take advantage of on board camera to upload images, and such mobile design will be focused on first followed by a desktop design


  <details>
  <summary>Backend overview </summary>
    <img src="https://raw.githubusercontent.com/jesusdoza/diagrams/932dd42c34978e4b55f0334809721430822bcae2/repair-reports/repair-reports-diagram.drawio.svg">
   
  </details>



in progress hosted on [cyclic](https://app.cyclic.sh/#/) https://repair-reports.cyclic.app/






## How It's Made:


**Tech used:** HTML, CSS, JavaScript, nodeJs, express, MongoDb, cloudinary




## Lessons Learned:
uploading can be delegated to client side with only having signature from server


## Things needed to run
- cloudinary account
- mongodb account

## /config/.env  file
#### cloudinary settings
- cloud_name = 
- cloud_key = 
- cloud_secret =
#### mongoDb connection string
- connect_string = 
#### port to use locally
- PORT = 
#### node enviroment for local run
- NODE_ENV = development


### start project
```npm install
    npm run dev
```
