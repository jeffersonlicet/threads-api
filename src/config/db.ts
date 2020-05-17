require('dotenv').config();

export const connection = {
  database: process.env.DB_NAME || 'threads',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3307', 10),
  dialect: 'mysql',
  define: {
    underscored: true,
  },
};
