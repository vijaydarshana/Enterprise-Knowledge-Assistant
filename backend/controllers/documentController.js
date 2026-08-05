const documentModel = require("../models/documentModel");

async function getDocuments(req, res) {

    try {

        const documents = await documentModel.getAllDocuments();

        res.status(200).json({
            success: true,
            count: documents.length,
            data: documents
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

module.exports = {
    getDocuments
};