/**
 *BMI formula
 * @param  {Object}  data
 * @return {Object} 
 */
let BMIFormula = data => {
  if (data.WeightKg > 0 && data.HeightCm > 0) {
    let finalBmi = data.WeightKg / (data.HeightCm / 100 * data.HeightCm / 100);
    finalBmi = finalBmi.toFixed(1);
    data.Bmi = finalBmi;
    if (finalBmi <= 18.4) {
      data.BMICategory = 'Underweight';
      data.BMIRange = '18.4 and below';
      data.HealthRisk = 'Malnutrition';
    }
    if (finalBmi >= 18.5 && finalBmi <= 24.9) {
      data.BMICategory = 'Normal weight';
      data.BMIRange = '18.5 -24.9';
      data.HealthRisk = 'Low risk';
    }
    if (finalBmi >= 25 && finalBmi <= 29.9) {
      data.BMICategory = 'Overweight';
      data.BMIRange = '25 -29.9';
      data.HealthRisk = 'Enhanced risk';
    }
    if (finalBmi >= 30 && finalBmi <= 34.9) {
      data.BMICategory = 'Moderately obese';
      data.BMIRange = '30 -34.9';
      data.HealthRisk = 'Medium risk';
    }
    if (finalBmi >= 35 && finalBmi <= 39.9) {
      data.BMICategory = 'Severely obese';
      data.BMIRange = '35 -39.9';
      data.HealthRisk = 'High risk';
    }
    if (finalBmi >= 40) {
      data.BMICategory = 'Very severely obese';
      data.BMIRange = '40 and above';
      data.HealthRisk = 'Very high risk';
    }
    return data;
  } else {
    data.error = "Invalid data";
    return data;
  }
};

/**
 * calculate BMI based on Hight and Weight
 * @param  {Array}  data
 * @return {Promise}
 */

module.exports.calculateBMI = data => new Promise((resolve, reject) => {
  if (Array.isArray(data) && data.length !== 0) {
    let finalResult = []
    data.forEach((user) => {
      if (user && user.HeightCm && user.WeightKg) {
        finalResult.push(BMIFormula(user));
      }
    });
    if (finalResult && finalResult.length !== 0) {
      let OverweightData = finalResult.filter((obj) => obj && obj.BMICategory === 'Overweight');
      resolve({ status: 'success', message: `Total ${OverweightData.length} person is Overweight`, data: OverweightData })
    } else {
      reject({ status: 'fail', message: 'Invalid data', data: finalResult });
    }
    // resolve(finalResult);
  } else {
    reject({ status: "fail", message: "Invaild data" });
  }
})
