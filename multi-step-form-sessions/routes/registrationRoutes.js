const express = require("express");
const registrationController = require("../controllers/registrationController");

const router = express.Router();

router.get("/step-one", registrationController.getStepOne);
router.post("/step-one", registrationController.postStepOne);

router.get("/step-two", registrationController.getStepTwo);
router.post("/step-two", registrationController.postStepTwo);

router.get("/review", registrationController.getReview);
router.post("/submit", registrationController.postSubmit);

router.post("/reset", registrationController.postReset);

module.exports = router;
