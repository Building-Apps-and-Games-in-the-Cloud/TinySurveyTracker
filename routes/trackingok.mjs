import express from 'express';
import {addTracking} from '../helpers/trackinghelper.mjs';
const router = express.Router();

// Render the home page but use the tracking middleware
router.get('/', addTracking,  (request, response) => {
  response.render('index.ejs');
});


export { router as trackingok };