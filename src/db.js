const fs = require('fs')
const loki = require('lokijs')
const path = require('path')

const db = new loki('ev.db')

const init = function() {
  console.log('initializing Loki DB...')

  const data = fs.readFileSync(path.resolve('src/MOCK_DATA.json'));
  const jsonData = JSON.parse(data);
  
  db.addCollection('properties').insert(jsonData)
}

module.exports = {
  init,
  db
}