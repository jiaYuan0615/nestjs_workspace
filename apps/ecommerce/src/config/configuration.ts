export default () => ({
  platform: process.env.APP_PLATFORM,
  platform_description: process.env.APP_PLATFORM_DESCRIPTION,
  version: process.env.APP_VERSION,
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  protocol: process.env.APP_PROTOCOL,
  host: process.env.APP_HOST,
  env: process.env.APP_ENV,
  key: process.env.APP_KEY,
  jwt_expire: process.env.JWT_EXPIRE,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    dialect: process.env.DATABASE_DIALECT,
    database: process.env.DATABASE_DATABASE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: process.env.DATABASE_LOGGING,
  }
})