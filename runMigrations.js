require('dotenv').config();

const { exec } = require('child_process');

const serverPath = process.env.NODE_ENV === 'production' ? 'server-dist' : 'server';

const models = require(`./${serverPath}/models`);

const executePromisifiedSequelize = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return reject(error);
      }
      console.log(`stdout: ${stdout}`);
      resolve(stdout);
    });
  });
};
models.User.findOne({ where: { email: 'admin@gmail.com' } }).then((response) => {
  if (!response) return executePromisifiedSequelize('./node_modules/.bin/sequelize db:migrate:undo:all');
  console.log('Haha.. you already seeded. Thanks for trying');
  return process.exit();
}).catch(() => {
  return executePromisifiedSequelize('./node_modules/.bin/sequelize db:migrate:undo:all');
}).then(() => executePromisifiedSequelize('./node_modules/.bin/sequelize db:migrate'))
  .then(() => executePromisifiedSequelize('./node_modules/.bin/sequelize db:seed:all'))
  .then(() => {
    process.exit();
  });

