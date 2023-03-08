import { randomUUID } from 'crypto';

function storeCreatorGUIDCookie(guid, response) {
    let cookieLifeInDays = 1000;
    let dayLengthInMillis = (24 * 60 * 60 * 1000);
    response.cookie("creatorGUID",
        guid,
        { maxAge: cookieLifeInDays * dayLengthInMillis });
}

function checkTracking(request, response, next) {
    // create a creator cookie if there isn't one 
    let guid = request.cookies.creatorGUID;
    if (guid) {
        // got a guid - write it back to refresh the age
        storeCreatorGUIDCookie(guid, response);
        next();
    }
    else {
        // Not got a cookie - are we OK to track this user?
        let trackConfirm = {
            heading: "Tracking",
            message: "This application uses a cookie which stores the topics of surveys you have voted in. The stored information is used to prevent multiple votes in the survey and for no other purpose.",
            menu: [
                {
                    description: "Continue with cookies",
                    route: "/trackingok"
                },

                {
                    description: "Abandon",
                    route: "https:/www.robmiles.com"
                }
            ]
        };
        response.render('menupage.ejs', trackConfirm);
    }
}

function addTracking(request, response, next) {
    let guid = request.cookies.creatorGUID;
    if (!guid) {
        let creatorGUID = randomUUID();
        storeCreatorGUIDCookie(creatorGUID, response);
    }
    next();
}

export { checkTracking, addTracking };

