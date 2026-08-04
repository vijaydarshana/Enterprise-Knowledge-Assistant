const driver = require("./config/neo4j");

async function testConnection() {
    const session = driver.session();

    try {
        const result = await session.run(
            "RETURN 'Connected to CognoDB Successfully!' AS message"
        );

        console.log(result.records[0].get("message"));
    } catch (error) {
        console.error("Connection Failed");
        console.error(error.message);
    } finally {
        await session.close();
        await driver.close();
    }
}

testConnection();