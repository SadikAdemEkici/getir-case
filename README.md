# Getir Backend Case

### Authors

Sadık Adem Ekici

### Project Introduction
Rest API was designed with NodeJS and ExpressJS
for Getir Backend Case.
The API just handle HTTP POST requests.
Swagger is used for API documentation.
A unit test was written using Jest.
Dockerfiles are also added for easy installation.
The project has been deployed on heroku. **Heroku Link:** [https://getir-case-app-ae.herokuapp.com](https://getir-case-app-ae.herokuapp.com)


## Getting Started

### Prerequisites

Node 14.X and MongoDB 5.X are required to run the project.

> If you already have a mongo cluster or if you want to use docker mongo for testing, there is no need to install mongo.

**MongoDB Atlas Cluster was used for production.**


### Running the Project

```bash
docker-compose up -d --build
```

or

```bash
npm install
npm run dev or npm start
``` 

### Running the Test

```bash
npm run test
``` 


### Swagger Documantation

If you get such error "TypeError: Not allowed to request resource". Select the correct server from the servers section at the top.

### Usage

>>>

>> Fetch Record
```http request
POST /records
```
Body:
```json
{
  "startDate": "2016-01-26", 
  "endDate": "2018-02-02", 
  "minCount": 2700, 
  "maxCount": 3000
}
```  

### Contact

Sadık Adem Ekici - [@Gmail](ademekici90@gmail.com) - ademekici90@gmail.com

Project Link: [https://github.com/SadikAdemEkici/getir-case](https://github.com/SadikAdemEkici/getir-case)
