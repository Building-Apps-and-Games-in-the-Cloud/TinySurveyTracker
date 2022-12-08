import express from 'express';
import { checkSurveys } from '../helpers/checkstorage.mjs';
import { checkTracking } from '../helpers/trackinghelper.mjs';

const router = express.Router();

// Home page - just render the index
router.get('/', checkTracking, checkSurveys, (request, response) => {
  response.render('index.ejs');
});


export { router as index };