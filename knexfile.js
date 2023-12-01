// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host:     process.env.DB_HOST     || '127.0.0.1',
      port:     process.env.DB_PORT     || 3306,
      database: process.env.DB_NAME     || 'evn_dev',
      user:     process.env.DB_USER     || 'mike_dev01',
      password: process.env.DB_PASSWORD || '1'
    },
    // debug: true,
    pool: { min: 0, max: 7 },
  },

  staging: {
    client: 'mysql2',
    connection: {
      host:     process.env.DB_HOST     || '127.0.0.1',
      port:     process.env.DB_PORT     || 3306,
      database: process.env.DB_NAME     || 'evn_dev',
      user:     process.env.DB_USER     || 'mike_dev01',
      password: process.env.DB_PASSWORD || '1'
    },
    debug: true,
    pool: { min: 0, max: 7 },
  },

  production: {
    client: 'mysql2',
    connection: {
      host:     process.env.DB_HOST     || '127.0.0.1',
      port:     process.env.DB_PORT     || 3306,
      database: process.env.DB_NAME     || 'evn_dev',
      user:     process.env.DB_USER     || 'mike_dev01',
      password: process.env.DB_PASSWORD || '1'
    },
    debug: true,
    pool: { min: 0, max: 7 },
  }

};
