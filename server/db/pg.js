const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/tedtools';

const client = new pg.Client(connectionString);
client.connect();

const query = client.query('SELECT * from media');
query.on("row", function (row, result) {
    result.addRow(row);
});
query.on("end", function (result) {
    console.log(JSON.stringify(result.rows, null, "    "));
    client.end();
});

//var query = client.query('SELECT * FROM media;');
console.log('QUERY', query);

module.exports = {pg, client};
