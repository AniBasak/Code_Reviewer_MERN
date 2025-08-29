const aiService = require("../services/ai.service");

module.exports.getReview = async(req, res) => {
    // console.log("Back End - getReview");
    const code = req.body.code;
    if(!code) {
        return res.status(400).json({error: "Code is required"});
    }

    const response = await aiService(code);

    res.send(response);
}

module.exports.getAndSaveReview  = async(req, res) => {
    const {code, review} = req.body;
    if(!code || !review) {
        return res.status(400).json({error: "Code and Review is required"});
    }
    try {
        const savedReview = await aiService.saveReviewToDB(code, review);
        res.status(200).json({
            message: "Review saved successfully",
            review: savedReview
        });
    } catch (error) {
        console.error("Error in getAndSaveReview:", error);
        res.status(500).json({error: "Failed to save review"});
    }
}