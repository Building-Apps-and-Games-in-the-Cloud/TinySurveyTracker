import express from 'express';
import { surveyManager } from '../tinysurvey.mjs';
import { checkSurveys } from '../helpers/checkstorage.mjs';
import { checkTracking } from '../helpers/trackinghelper.mjs';

const router = express.Router();

function messageDisplay(message,response){
  let messageDescription = {
    heading: "Delete",
    message: message,
    menu: [
      {
        description: "Continue",
        route: "/"
      }
    ]
  };
  response.render('menupage.ejs', messageDescription);
}

router.get('/:topic', checkTracking, checkSurveys, async (request, response) => {

  let topic = request.params.topic;

  let surveyOptions = await surveyManager.getOptions(topic);

  if (surveyOptions) {
    // Found the survey
    // Need to check if this person created the survey
    if (surveyOptions.creatorGUID == request.cookies.creatorGUID) {
      // This is the owner of the survey - can delete it
      await surveyManager.deleteSurvey(topic);
      messageDisplay("The survey has been deleted",response);
    }
    else{
      // Not the owner - display a message
      messageDisplay("You are not the creator of this survey",response);
      }
  }
  else {
    // Survey not found
    messageDisplay("The survey was not found",response);
   }
});

export { router as deletesurvey };
