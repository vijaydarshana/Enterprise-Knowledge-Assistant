const searchModel = require("../models/searchModel");

async function search(req, res) {

    try {

        const keyword = req.query.q || "";

        const results = await searchModel.search(keyword);

        res.json({
            success: true,
            data: results,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}

module.exports = {
    search,
};