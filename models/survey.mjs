import mongoose from "mongoose";

var optionSchema = mongoose.Schema({

    text: {
        type: String,
        required: true
    },

    count: {
        type: Number,
        required: true
    }
});

var surveySchema = mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    options: {
        type: [optionSchema],
        required: true
    },
    creatorGUID: {
        type: String,
        required:false
    }
});

let Surveys = mongoose.model('surveys', surveySchema);
    
export { Surveys as Surveys };