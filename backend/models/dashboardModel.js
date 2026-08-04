const driver = require("../config/neo4j");

async function getStats() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (e:Employee)
      WITH count(e) AS employees

      MATCH (p:Project)
      WITH employees, count(p) AS projects

      MATCH (s:Skill)
      WITH employees, projects, count(s) AS skills

      MATCH (d:Document)
      RETURN
        employees,
        projects,
        skills,
        count(d) AS documents
    `);

    const record = result.records[0];

    return {
      employees: Number(record.get("employees")),
      projects: Number(record.get("projects")),
      skills: Number(record.get("skills")),
      documents: Number(record.get("documents")),
    };
  } finally {
    await session.close();
  }
}

module.exports = {
  getStats,
};