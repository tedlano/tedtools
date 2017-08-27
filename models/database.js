const {pg,client} = require('../db/pg');

const query = client.query(
  'CREATE TABLE media(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', () => { client.end(); });
