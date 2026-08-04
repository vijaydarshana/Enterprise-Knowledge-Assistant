const driver = require("../config/neo4j");

async function getTopEmployees(){

    const session = driver.session();

    try{

        const result = await session.run(`

        MATCH (e:Employee)-[:KNOWS]->(s:Skill)

        RETURN

        e.name AS employee,

        count(s) AS skills

        ORDER BY skills DESC

        LIMIT 5

        `);

        return result.records.map(record=>({

            name:record.get("employee"),

            skills:Number(record.get("skills"))

        }));

    }finally{

        await session.close();

    }

}

module.exports={
    getTopEmployees
}