var express = require('express');
var router = express.Router();
var Joi = require('joi');
var meds = require('../../JSON_schemas/pharmacy/medicines');
var medicine = require('../../models/medicine');

var stringify = require('json-stringify-safe');
var fs = require('fs');

// To insert dummy data into the DB
var medicines = JSON.parse(fs.readFileSync('JSON_contracts/medicines.json'));

/* GET medicines listing. */
router.get('/medicines/', function (req, res, next) {
    medicine.find().exec(function (err, medicines) {
        res.send(medicines);
    });

});

/* GET medicine from id. */
router.get('/medicines/:id', function (req, res, next) {
    const med = medicine.find(c => c.id === parseInt(req.params.id));
    if (!medicine) return res.status(404).send(`Category with id ${req.params.id} is not present in the list`);
    med.exec(function (err, medicines) { res.send(medicine) });
});

/* POST a medicine. */
router.post('/medicines/', function (req, res, next) {

    const { error } = meds.med_schema(req.body); // Same as result.error
    if (error) return res.status(400).send(error.details[0].message);
    medicine.create({
        id: "MED".concat(Math.floor((Math.random() * 10000) + 9999).toString(10)),
        name: req.body.name,
        mfgBy: req.body.mfgBy
    });
    res.send("Medicine added!");
});

/* UPDATE a medicine. */
router.put('/medicines/:id', (req, res) => {

    // Look up for the medicine
    const medicine = medicines.find(c => c.id === parseInt(req.params.id));
    if (!medicine) return res.status('404').send(`Category with id ${req.params.id} is not present in the list`);

    const result = validateCategory(req.body);
    const { error } = validateCategory(req.body); // Same as result.error
    if (error) return res.status(400).send(error.details[0].message);

    // Update medicine
    medicine.name = req.body.name;
    res.send(medicine);

});

// DELETE a medicine
router.delete('/medicines/:id', (req, res) => {

    // Look up for the medicine
    const medicine = medicines.find(c => c.id === parseInt(req.params.id));
    if (!medicine) return res.status(404).send(`Category with id ${req.params.id} is not present in the list`);

    // Delete
    const index = medicines.indexOf(medicine);
    medicines.splice(index, 1);

    res.send(medicine);
});

function validateCategory(medicine) {

    const schema = {
        name: Joi.string().min(3).required(),
        description: Joi.string()
    };

    return Joi.validate(medicine, schema);
}

module.exports = router;