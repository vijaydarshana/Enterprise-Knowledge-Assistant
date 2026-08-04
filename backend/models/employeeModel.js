const driver = require("../config/neo4j");

// Get all employees
async function getAllEmployees() {
    const session = driver.session();

    try {
        const result = await session.run(`
            MATCH (e:Employee)
            RETURN e
            ORDER BY e.name
        `);

        return result.records.map(record => record.get("e").properties);

    } finally {
        await session.close();
    }
}

// Get employee skills
async function getEmployeeSkills(employeeId) {
    const session = driver.session();

    try {
        const result = await session.run(
            `
            MATCH (e:Employee {id:$employeeId})-[:KNOWS]->(s:Skill)
            RETURN
                e.name AS employee,
                collect(s.name) AS skills
            `,
            { employeeId }
        );

        if (result.records.length === 0) {
            return null;
        }

        return {
            employee: result.records[0].get("employee"),
            skills: result.records[0].get("skills")
        };

    } finally {
        await session.close();
    }
}
async function getEmployeeById(employeeId) {
    const session = driver.session();

    try {
        const result = await session.run(
            `
            MATCH (e:Employee {id:$employeeId})

            OPTIONAL MATCH (e)-[:BELONGS_TO]->(d:Department)
            OPTIONAL MATCH (e)-[:KNOWS]->(s:Skill)
            OPTIONAL MATCH (e)-[:WORKS_ON]->(p:Project)

            RETURN
                e,
                d.name AS department,
                collect(DISTINCT s.name) AS skills,
                collect(DISTINCT p.name) AS projects
            `,
            { employeeId }
        );

        if (result.records.length === 0) return null;

        const record = result.records[0];
        const employee = record.get("e").properties;

        return {
            ...employee,
            department: record.get("department"),
            skills: record.get("skills"),
            projects: record.get("projects"),
        };
    } finally {
        await session.close();
    }
}

module.exports = {
    getAllEmployees,
    getEmployeeSkills,
    getEmployeeById
};