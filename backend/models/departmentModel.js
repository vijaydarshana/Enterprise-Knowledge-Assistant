const driver = require("../config/neo4j");

async function getDepartments() {
    const session = driver.session();

    try {
        const result = await session.run(`
            MATCH (d:Department)
            RETURN d
            ORDER BY d.name
        `);

        return result.records.map(record => record.get("d").properties);

    } finally {
        await session.close();
    }
}

module.exports = {
    getDepartments
};