const driver = require("../config/neo4j");

async function search(keyword) {
    const session = driver.session();

    try {
        const result = await session.run(
            `
            CALL {

                MATCH (e:Employee)

                WHERE toLower(e.name) CONTAINS toLower($keyword)

                RETURN
                    'Employee' AS type,
                    e.id AS id,
                    e.name AS name

                UNION

                MATCH (s:Skill)

                WHERE toLower(s.name) CONTAINS toLower($keyword)

                RETURN
                    'Skill',
                    s.id,
                    s.name

                UNION

                MATCH (p:Project)

                WHERE toLower(p.name) CONTAINS toLower($keyword)

                RETURN
                    'Project',
                    p.id,
                    p.name

            }

            RETURN type,id,name
            `,
            { keyword }
        );

        return result.records.map(record => ({
            type: record.get("type"),
            id: record.get("id"),
            name: record.get("name"),
        }));

    } finally {
        await session.close();
    }
}

module.exports = {
    search,
};