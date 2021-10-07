/** @type {import('next').NextConfig} */
require('dotenv').config()
module.exports = {
  reactStrictMode: true,
  database: {
    user: 'ASUS',
    host: 'localhost',
    database: 'staffany',
    password: '123',
    port: 5432,
  }
}
