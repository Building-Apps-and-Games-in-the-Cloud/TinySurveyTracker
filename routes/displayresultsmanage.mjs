import express from 'express';
import { surveyManager } from '../tinysurvey.mjs';
import {addTracking} from '../helpers/trackinghelper.mjs';

const router = express.Router();

router.get('/:topic', addTracking, async (request, response) => {
  let topic = request.params.topic;
  if (! await surveyManager.surveyExists(topic)) {
    response.status(404).send('<h1>Survey not found</h1>');
  }
  else {
    let results = await surveyManager.getCounts(topic);
    response.render('displayresultsmanage.ejs', results);
  }
});


export { router as displayresultsmanage };