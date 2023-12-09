import express from "express";

import Feedback from "../models/feedback.model.js";

export const createFeedback = (feedback) => {
    try {

        const newFeedback = new Feedback({
            feedback: feedback,
        });
        return newFeedback.save();
    } catch (error) {
        console.error(error)
        return null
    }
}
