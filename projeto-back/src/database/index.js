const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.BD_DATABASE, process.env.BD_USER, process.env.BD_PW, {
    host: process.env.BD_SERVER,
    dialect: process.env.BD_TYPE, // 'postgres' no seu caso
    port: parseInt(process.env.BD_PORT), // Converte a porta para número
    retry: {
        match: [/ConnectionRefusedError/, 'ECONNREFUSED'],
        max: 5, // Número de tentativas antes de falhar
        backoffBase: 20000, // Tempo base em milissegundos entre as tentativas (5 segundos)
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o PostgreSQL através do Sequelize foi bem-sucedida!');
    })
    .catch(err => {
        console.error('Erro ao conectar ao PostgreSQL usando Sequelize:', err);
    });

module.exports = sequelize;
