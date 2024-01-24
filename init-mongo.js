const path = require('path');
const fs = require('fs');

const userSchema = JSON.parse(fs.readFileSync(
  path.resolve('/', 'home', 'schemas', 'user.json')
));
const numberSchema = JSON.parse(fs.readFileSync(
  path.resolve('/', 'home', 'schemas', 'number.json')
));

db.createUser({
  user: 'admin',
  pwd: 'reallysupersecureadminpassword',
  roles: [{ role: 'root', db: 'admin' }]
});

db.createUser({
  user: 'api',
  pwd: 'reallysupersecurepassword',
  roles: [{
    role: 'readWrite',
    db: 'private-public'
  }]
});

db = db.getSiblingDB('private-public')

db.createCollection("users", {
  validator: {
    $jsonSchema: userSchema
  }
});

db.users.createIndex({ username: 1 }, { unique: true });

db.createCollection("numbers", {
  validator: {
    $jsonSchema: numberSchema
  }
});

db.numbers.createIndex({ user: 1 }, { unique: true });

