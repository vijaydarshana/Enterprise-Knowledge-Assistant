const driver = require("../config/neo4j");

async function getProjects() {
    const session = driver.session();

    try {

        const result = await session.run(`
            MATCH (p:Project)
            RETURN p
            ORDER BY p.name
        `);

        return result.records.map(r => r.get("p").properties);

    } finally {
        await session.close();
    }
}

async function recommendEmployees(projectId) {

    const session = driver.session();

    try {

        const result = await session.run(
            `
            MATCH (p:Project {id:$projectId})-[:USES]->(s:Skill)

            MATCH (e:Employee)-[:KNOWS]->(s)

            RETURN

            p.name AS project,

            e.name AS employee,

            collect(s.name) AS skills,

            count(s) AS matchedSkills

            ORDER BY matchedSkills DESC
            `,
            { projectId }
        );

        if(result.records.length===0){

            return null;

        }

        return {

            project:result.records[0].get("project"),

            employees:result.records.map(record=>({

                name:record.get("employee"),

                matchedSkills:Number(record.get("matchedSkills")),

                skills:record.get("skills")

            }))

        };

    } finally {

        await session.close();

    }

}
async function getProjectById(projectId) {
    const session = driver.session();

    try {

        const result = await session.run(
            `
            MATCH (p:Project {id:$projectId})

            OPTIONAL MATCH (e:Employee)-[:WORKS_ON]->(p)
            OPTIONAL MATCH (p)-[:USES]->(s:Skill)
            OPTIONAL MATCH (p)-[:HAS_DOCUMENT]->(d:Document)

            RETURN
                p,
                collect(DISTINCT e.name) AS employees,
                collect(DISTINCT s.name) AS skills,
                collect(DISTINCT d.title) AS documents
            `,
            { projectId }
        );

        if (result.records.length === 0) return null;

        const record = result.records[0];
        const project = record.get("p").properties;

        return {
            ...project,
            employees: record.get("employees"),
            skills: record.get("skills"),
            documents: record.get("documents")
        };

    } finally {
        await session.close();
    }
}
module.exports={
    getProjects,
    recommendEmployees,
    getProjectById
};