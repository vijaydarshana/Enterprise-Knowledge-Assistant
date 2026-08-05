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
            OPTIONAL MATCH (e)-[:WORKS_ON]->(p:Project)
            OPTIONAL MATCH (e)-[:KNOWS]->(s:Skill)

            RETURN
                e,
                d.id AS departmentId,
                d.name AS department,
                head(collect(DISTINCT p.id)) AS projectId,
                head(collect(DISTINCT p.name)) AS project,
                collect(DISTINCT s.id) AS skillIds,
                collect(DISTINCT s.name) AS skills
            `,
            { employeeId }
        );

        if (result.records.length === 0) return null;

        const record = result.records[0];
        const employee = record.get("e").properties;

        return {
            ...employee,
            departmentId: record.get("departmentId"),
            department: record.get("department"),
            projectId: record.get("projectId"),
            project: record.get("project"),
            skillIds: record.get("skillIds"),
            skills: record.get("skills"),
        };
    } finally {
        await session.close();
    }
}

async function createEmployee(employee) {
    const session = driver.session();

    const tx = session.beginTransaction();

    try {

        // Create Employee
        await tx.run(
            `
            CREATE (e:Employee {
                id:$id,
                name:$name,
                email:$email,
                designation:$designation
            })
            `,
            employee
        );

        // Department Relationship
        await tx.run(
            `
            MATCH (e:Employee {id:$id})
            MATCH (d:Department {id:$departmentId})
            CREATE (e)-[:BELONGS_TO]->(d)
            `,
            employee
        );

        // Project Relationship
        await tx.run(
            `
            MATCH (e:Employee {id:$id})
            MATCH (p:Project {id:$projectId})
            CREATE (e)-[:WORKS_ON]->(p)
            `,
            employee
        );

        // Skill Relationships
        for (const skillId of employee.skillIds) {

            await tx.run(
                `
                MATCH (e:Employee {id:$id})
                MATCH (s:Skill {id:$skillId})
                CREATE (e)-[:KNOWS]->(s)
                `,
                {
                    id: employee.id,
                    skillId
                }
            );

        }

        await tx.commit();

        return employee;

    } catch (error) {

        await tx.rollback();
        throw error;

    } finally {

        await session.close();

    }
}
async function updateEmployee(id, employee) {
    const session = driver.session();

    try {

        await session.run(
            `
            MATCH (e:Employee {id:$id})

            SET
                e.name=$name,
                e.email=$email,
                e.designation=$designation

            RETURN e
            `,
            {
                id,
                ...employee
            }
        );

        return {
            id,
            ...employee
        };

    } finally {

        await session.close();

    }
}

async function deleteEmployee(id) {
    const session = driver.session();

    try {

        await session.run(
            `
            MATCH (e:Employee {id:$id})

            DETACH DELETE e
            `,
            { id }
        );

        return true;

    } finally {

        await session.close();

    }
}
module.exports = {
    getAllEmployees,
    getEmployeeSkills,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};