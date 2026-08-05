const driver = require("../config/neo4j");

// Get all skills
async function getAllSkills() {
    const session = driver.session();

    try {
        const result = await session.run(`
            MATCH (s:Skill)
            RETURN s
            ORDER BY s.name
        `);

        return result.records.map(record => ({
            ...record.get("s").properties
        }));

    } finally {
        await session.close();
    }
}

module.exports = {
    getAllSkills
};