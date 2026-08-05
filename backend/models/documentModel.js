const driver = require("../config/neo4j");

async function getAllDocuments() {
    const session = driver.session();

    try {

        const result = await session.run(`
            MATCH (d:Document)
            RETURN d
            ORDER BY d.title
        `);

        return result.records.map(record => ({
            ...record.get("d").properties
        }));

    } finally {

        await session.close();

    }
}

module.exports = {
    getAllDocuments
};