const driver = require("../config/neo4j");

async function seedDatabase() {
  const session = driver.session();

  try {
    console.log("Clearing database...");

    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    // ==========================
    // Departments
    // ==========================
    console.log("Creating Departments...");

    await session.run(
      `
      UNWIND $departments AS department
      CREATE (:Department {
        id: department.id,
        name: department.name
      })
      `,
      {
        departments: [
          { id: "DEP001", name: "Engineering" },
          { id: "DEP002", name: "AI Research" }
        ]
      }
    );

    // ==========================
    // Skills
    // ==========================
    console.log("Creating Skills...");

    await session.run(
      `
      UNWIND $skills AS skill
      CREATE (:Skill {
        id: skill.id,
        name: skill.name
      })
      `,
      {
        skills: [
          { id: "SK001", name: "React" },
          { id: "SK002", name: "Node.js" },
          { id: "SK003", name: "Docker" },
          { id: "SK004", name: "PostgreSQL" },
          { id: "SK005", name: "MongoDB" },
          { id: "SK006", name: "Express.js" }
        ]
      }
    );

    // ==========================
    // Employees
    // ==========================
    console.log("Creating Employees...");

    await session.run(
      `
      UNWIND $employees AS employee
      CREATE (:Employee {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        designation: employee.designation
      })
      `,
      {
        employees: [
          {
            id: "EMP001",
            name: "Rahul Sharma",
            email: "rahul@company.com",
            designation: "Software Engineer"
          },
          {
            id: "EMP002",
            name: "Priya Verma",
            email: "priya@company.com",
            designation: "Frontend Developer"
          },
          {
            id: "EMP003",
            name: "Amit Kumar",
            email: "amit@company.com",
            designation: "Backend Developer"
          }
        ]
      }
    );

    // ==========================
    // Projects
    // ==========================
    console.log("Creating Projects...");

    await session.run(
      `
      UNWIND $projects AS project
      CREATE (:Project {
        id: project.id,
        name: project.name,
        status: project.status
      })
      `,
      {
        projects: [
          {
            id: "PR001",
            name: "Enterprise Knowledge Assistant",
            status: "Active"
          },
          {
            id: "PR002",
            name: "AI Chatbot",
            status: "Completed"
          }
        ]
      }
    );

    // ==========================
    // Documents
    // ==========================
    console.log("Creating Documents...");

    await session.run(
      `
      UNWIND $documents AS document
      CREATE (:Document {
        id: document.id,
        title: document.title,
        url: document.url
      })
      `,
      {
        documents: [
          {
            id: "DOC001",
            title: "React Best Practices",
            url: "https://company.com/docs/react"
          },
          {
            id: "DOC002",
            title: "Docker Deployment Guide",
            url: "https://company.com/docs/docker"
          }
        ]
      }
    );

    // ==========================
    // Employee -> Department
    // ==========================
    console.log("Creating BELONGS_TO relationships...");

    await session.run(`
      MATCH (e:Employee {id:'EMP001'}),(d:Department {id:'DEP001'})
      CREATE (e)-[:BELONGS_TO]->(d)
    `);

    await session.run(`
      MATCH (e:Employee {id:'EMP002'}),(d:Department {id:'DEP001'})
      CREATE (e)-[:BELONGS_TO]->(d)
    `);

    await session.run(`
      MATCH (e:Employee {id:'EMP003'}),(d:Department {id:'DEP002'})
      CREATE (e)-[:BELONGS_TO]->(d)
    `);

    // ==========================
    // Employee -> Skills
    // ==========================
    console.log("Creating KNOWS relationships...");

    const employeeSkills = [
      ["EMP001", "SK001"],
      ["EMP001", "SK002"],
      ["EMP001", "SK003"],
      ["EMP002", "SK001"],
      ["EMP002", "SK006"],
      ["EMP003", "SK002"],
      ["EMP003", "SK004"],
      ["EMP003", "SK005"]
    ];

    for (const [emp, skill] of employeeSkills) {
      await session.run(
        `
        MATCH (e:Employee {id:$emp}),
              (s:Skill {id:$skill})
        CREATE (e)-[:KNOWS]->(s)
        `,
        { emp, skill }
      );
    }

    // ==========================
    // Employee -> Projects
    // ==========================
    console.log("Creating WORKS_ON relationships...");

    const employeeProjects = [
      ["EMP001", "PR001"],
      ["EMP002", "PR001"],
      ["EMP003", "PR002"]
    ];

    for (const [emp, project] of employeeProjects) {
      await session.run(
        `
        MATCH (e:Employee {id:$emp}),
              (p:Project {id:$project})
        CREATE (e)-[:WORKS_ON]->(p)
        `,
        { emp, project }
      );
    }

    // ==========================
    // Project -> Skills
    // ==========================
    console.log("Creating USES relationships...");

    const projectSkills = [
      ["PR001", "SK001"],
      ["PR001", "SK002"],
      ["PR001", "SK003"],
      ["PR001", "SK006"],
      ["PR002", "SK004"],
      ["PR002", "SK005"]
    ];

    for (const [project, skill] of projectSkills) {
      await session.run(
        `
        MATCH (p:Project {id:$project}),
              (s:Skill {id:$skill})
        CREATE (p)-[:USES]->(s)
        `,
        { project, skill }
      );
    }

    // ==========================
    // Project -> Documents
    // ==========================
    console.log("Creating HAS_DOCUMENT relationships...");

    const projectDocs = [
      ["PR001", "DOC001"],
      ["PR002", "DOC002"]
    ];

    for (const [project, doc] of projectDocs) {
      await session.run(
        `
        MATCH (p:Project {id:$project}),
              (d:Document {id:$doc})
        CREATE (p)-[:HAS_DOCUMENT]->(d)
        `,
        { project, doc }
      );
    }

    // ==========================
    // Document -> Skills
    // ==========================
    console.log("Creating ABOUT relationships...");

    const documentSkills = [
      ["DOC001", "SK001"],
      ["DOC002", "SK003"]
    ];

    for (const [doc, skill] of documentSkills) {
      await session.run(
        `
        MATCH (d:Document {id:$doc}),
              (s:Skill {id:$skill})
        CREATE (d)-[:ABOUT]->(s)
        `,
        { doc, skill }
      );
    }

    console.log("\nDatabase seeded successfully!");
  } catch (error) {
    console.error("Seed Error:", error);
  } finally {
    await session.close();
    await driver.close();
  }
}

seedDatabase();