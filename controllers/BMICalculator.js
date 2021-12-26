const express = require('express');
const fs = require('fs');
const path = require("path");
const csvTojson = require("csvtojson");
const BMICalculatorService = require('../services/BMICalculator');
let router = express.Router();


/**
 * Calcluate overweight using BMI formula.
 * 
 * POST /api/bmicalculator/overweight.
 * 
 * @param  {Array|File}  req
 * @return {Object} 
 */
router.post('/bmicalculator/overweight', (req, res) => {
  if (req.files && req.files.dataFile) {
    /* Read data from source file */
    let dataFile = req.files.dataFile;
    let extensionName = path.extname(dataFile.name);
    /* Check file extension */
    if (extensionName === '.csv') {
      dataFile.mv('./uploads/' + dataFile.name, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        /* Convert csv file in JSON array */
        csvTojson()
          .fromFile('./uploads/' + dataFile.name)
          .then(jsonArrayObj => {
            /* delete file after read the from file */
            fs.unlinkSync('./uploads/' + dataFile.name);

            BMICalculatorService
              .calculateBMI(jsonArrayObj)
              .then(resultData => res.status(200).send(resultData))
              .catch(err => res.status(400).send(err));
          })
      });
    } else {
      res.status(400).send({ status: 'fail', message: 'Invalid file upload, Only CSV file accept with valid templete', data: [] });
    }
  } else if (req.body && Array.isArray(req.body)) {
    /* If data source is request body */
    BMICalculatorService
      .calculateBMI(req.body)
      .then(resultData => res.status(200).send(resultData))
      .catch(err => res.status(400).send(err));
  } else {
    res.status(400).send({ status: 'fail', message: 'Please provide valid data', data: [] });
  }
});

/**
 * Calcluate overweight using BMI formula.
 * Using local JSON file 
 * GET /api/bmicalculator/overweight.
 * 
 * @param  {}  
 * @return {Object} 
 */
router.get('/bmicalculator/overweight', (req, res) => {
  /* Read data from local file data.json */
  let fileData = require('../data/data.json');
  if (fileData && Array.isArray(fileData)) {
    BMICalculatorService
      .calculateBMI(fileData)
      .then(resultData => res.status(200).send(resultData))
      .catch(err => res.status(400).send(err));
  } else {
    res.status(400).send({ status: 'fail', message: 'Please provide valid data', data: [] });
  }
});

module.exports = router;