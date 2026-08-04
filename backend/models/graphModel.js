const driver = require("../config/neo4j");

async function getGraph() {
    const session = driver.session();

    try {

        const result = await session.run(`
            MATCH (a)-[r]->(b)

            RETURN
                a,
                b,
                type(r) AS relation
        `);

        const nodes = new Map();
        const edges = [];

        result.records.forEach(record => {

            const a = record.get("a");
            const b = record.get("b");

            const relation = record.get("relation");

            nodes.set(a.properties.id, {
                id: a.properties.id,
                label:
                    a.properties.name ||
                    a.properties.title,
                type: a.labels[0]
            });

            nodes.set(b.properties.id, {
                id: b.properties.id,
                label:
                    b.properties.name ||
                    b.properties.title,
                type: b.labels[0]
            });

            edges.push({
                id: `${a.properties.id}-${b.properties.id}`,

                source: a.properties.id,

                target: b.properties.id,

                label: relation
            });

        });

        return {

            nodes: [...nodes.values()],

            edges

        };

    } finally {

        await session.close();

    }

}

module.exports = {

    getGraph

};