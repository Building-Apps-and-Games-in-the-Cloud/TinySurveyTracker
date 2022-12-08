import express from 'express';
import { surveyManager } from '../tinysurvey.mjs';
import { checkSurveys } from '../helpers/checkstorage.mjs';
import { checkTracking } from '../helpers/trackinghelper.mjs';

const router = express.Router();

router.get('/:topic', checkTracking, checkSurveys, async (request, response) => {

  let topic = request.params.topic;

  let surveyOptions = await surveyManager.getOptions(topic);

  if (surveyOptions) {
    // Need to check if this person created the survey
    if (surveyOptions.creatorGUID == request.cookies.creatorGUID) {
      // Render the results and add a delete button
      await surveyManager.deleteSurvey(topic);
      let deleteMessage = {
        heading: "Delete",
        message: `The survey ${topic} has been deleted. Press OK to continue`,
        url: "/",
        buttonText: "OK"
      };
      response.render('displaymessage.ejs', deleteMessage);
    };
  }
  else {
    let deleteMessage = {
      heading: "Delete",
      message: `The survey was not found. Press OK to continue`,
      url: "/",
      buttonText: "OK"
    };
    response.render('displaymessage.ejs', deleteMessage);
  }
});

export { router as deletesurvey };
