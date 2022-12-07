var neo4j = require('neo4j-driver');

console.log('process.env.GRAPHENEDB_BOLT_URL',process.env.GRAPHENEDB_BOLT_URL)
console.log('process.env.GRAPHENEDB_BOLT_USER',process.env.GRAPHENEDB_BOLT_USER)
console.log('process.env.GRAPHENEDB_BOLT_PASSWORD',process.env.GRAPHENEDB_BOLT_PASSWORD)

let driver = neo4j.driver(
    process.env.GRAPHENEDB_BOLT_URL, neo4j.auth.basic(process.env.GRAPHENEDB_BOLT_USER, process.env.GRAPHENEDB_BOLT_PASSWORD), {  disableLosslessIntegers: true }
);



exports.neo4j = {
    executeCypherAsync: async function (cql, readonly, parameters) {

        var session = driver.session({ defaultAccessMode: readonly ? neo4j.session.READ : neo4j.session.WRITE })
        try {
            var result = await session.run(cql, parameters);

            if (result && result.records && result.records.length > 0 && result.records[0]._fields && result.records[0]._fields.length > 0)
                return result.records[0]._fields[0];
            else
                return {};

        }
        finally {
            session.close();
        }
    }
}