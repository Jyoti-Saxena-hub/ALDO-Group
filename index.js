const express = require('express');
const hana = require('@sap/hana-client');

const app = express();
const PORT = process.env.PORT || 3000;

function getConnection() {
  const conn = hana.createConnection();
  conn.connect({
    serverNode: `${process.env.HANA_HOST}:${process.env.HANA_PORT}`,
    uid: process.env.HANA_USER,
    pwd: process.env.HANA_PASSWORD,
    schema: process.env.HANA_SCHEMA
  });
  return conn;
}

app.get('/mara', (req, res) => {
  const conn = getConnection();
  try {
    const result = conn.exec('SELECT * FROM "MARA" LIMIT 20');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    conn.disconnect();
  }
});

app.listen(PORT, () => console.log(`Service running on port ${PORT}`));
