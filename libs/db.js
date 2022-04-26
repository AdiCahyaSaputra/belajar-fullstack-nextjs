const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'nextjs',
    password : 'Nextjs123##', // gk rekomended, mending taro di .env
    database : 'fullstack_nextjs'
  }
});

export default knex;