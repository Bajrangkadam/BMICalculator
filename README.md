
# BMI calculator API
---
## Features:
1. "csvTojson" for convrt csv file to JSON
2. "fs" for file reading and deleting
3. "nodemon" - Autorestart on changes
4. "debug" for debugging
5. "promis" for handling promises
6. "helmet" for security
7. "cors" for CORS Support
9. "express-fileupload" for file upload 
---

---
## Prerequisites

* [Node.js](https://nodejs.org) - 8.9.0 or above
* [NPM](https://docs.npmjs.com/getting-started/installing-node) - 3.10.8 or above
---

---
## Setup

Copy the directory to destination and run below command from the terminal

    $ npm install

Finally, start the application.

    $ npm run start:dev (For development)
    $ npm run start (For production)

Navigate to http://localhost:3000/ to verify installation.

---

---
## BMI Calculator Formula

    Weight(Kg) / (Height(Cm) / 100 * Height(Cm) / 100)

---

---
## CURL's

1. Source data from local file

    curl --location --request GET 'http://localhost:3000/api/bmicalculator/overweight'

2. Source data as a request

    curl --location --request POST 'http://localhost:3000/api/bmicalculator/overweight' \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "Gender": "Male",
        "HeightCm": 171,
        "WeightKg": 96
    },
    {
        "Gender": "Male",
        "HeightCm": 161,
        "WeightKg": 85
    },
    {
        "Gender": "Male",
        "HeightCm": 180,
        "WeightKg": 77
    },
    {
        "Gender": "Female",
        "HeightCm": 166,
        "WeightKg": 62
    },
    {
        "Gender": "Female",
        "HeightCm": 150,
        "WeightKg": 70
    },
    {
        "Gender": "Female",
        "HeightCm": 167,
        "WeightKg": 82
    }
]'


3. Source data file as request

    curl --location --request POST 'http://localhost:3000/api/bmicalculator/overweight' \
--form 'dataFile=@"/C:/workspace/BMICalculator/data/sourceData.csv"'



Note: Please use source file as a CSV file. i.e "sourceData.csv" which is locate in BMICalculator/data folder of project 