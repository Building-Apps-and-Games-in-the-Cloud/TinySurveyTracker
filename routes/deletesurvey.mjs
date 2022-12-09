import express from 'express';
import { surveyManager } from '../tinysurvey.mjs';
import { checkSurveys } from '../helpers/checkstorage.mjs';
import { checkTracking } from '../helpers/trackinghelper.mjs';

const router = express.Router();

router.get('/:topic', checkTracking, checkSurveys, async (request, response) => {

  let topic = request.params.topic;

  let surveyOptions = await surveyManager.getOptions(topic);

  if (surveyOptions) {
    // Found the survey
    // Need to check if this person created the survey
    if (surveyOptions.creatorGUID == request.cookies.creatorGUID) {
      // This is the owner of the survey - can delete it
      await surveyManager.deleteSurvey(topic);

      let deleteCompleteMenu = {
        heading: "Delete",
        message: "The survey has been deleted",
        menu: [
          {
            description: "Continue",
            route: "/"
          }
        ]
      };
      response.render('menupage.ejs', deleteCompleteMenu);
    }
    else{
      // Not the owner - display a message
      let wrongUserMenu = {
        heading: "Delete",
        message: "You are not the creator of this survey",
        menu: [
          {
            description: "Continue",
            route: "/"
          }
        ]
      };
      response.render('menupage.ejs', wrongUserMenu);
      }
  }
  else {
    // Survey not found
    let deleteCompleteMenu = {
      heading: "Delete",
      message: "The survey was not found",
      menu: [
        {
          description: "Continue",
          route: "/"
        }
      ]
    };
    response.render('menupage.ejs', deleteCompleteMenu);
  }
});

export { router as deletesurvey };
