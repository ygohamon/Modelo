const { Sequelize, DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const sequelize = require('../../database'); // Supondo que este seja o arquivo onde você configurou a conexão com Sequelize

const User = sequelize.define('User', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    CPF: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    NOME: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    EMAIL: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    PERFIL: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    SENHA: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    RESETCODE: {
        type: DataTypes.STRING, // Correto para armazenar um código
        allowNull: true,
    },
    RESETEXPIRED: {
        type: DataTypes.DATE, // Correção para armazenar a data de expiração
        allowNull: true,
    },
    CREATEDAT: {
        type: DataTypes.DATE, // Correção para armazenar a data de criação
        allowNull: false,
        defaultValue: DataTypes.NOW // Define o valor padrão como a data atual
    }
}, {
    tableName: 'Users', // Nome da tabela no banco de dados
    timestamps: false, // Desative timestamps se não precisar deles
});

// Middleware para hash da senha antes de salvar
User.beforeCreate(async (user) => {
    user.SENHA = await bcryptjs.hash(user.SENHA, 10);
});

// Sincronizar o modelo com o banco de dados (cria a tabela se não existir)
sequelize.sync()
    .then(async () => {
        console.log('Tabela Users sincronizada com sucesso.');

        // Verifica se o usuário inicial já existe para evitar duplicação
        const existingUser = await User.findOne({ where: { EMAIL: 'admin@projeto.com.br' } });

        if (!existingUser) {
            // Insere o registro inicial
            await User.create({
                CPF: '12345678901',
                CREATEDAT: new Date('2024-04-08T00:00:00.000Z'),
                EMAIL: 'admin@projeto.com.br',
                NOME: 'admin',
                PERFIL: 'Admin',
                SENHA: '$2a$10$DvYS1N1TUNTkT5.UQclzSumvs3GK26khw449.VvbGuHdHuifz7YaC', // Senha já hasheada
                RESETCODE: null,
                RESETEXPIRED: null
            });

            console.log('Usuário admin inserido com sucesso.');
        } else {
            console.log('Usuário admin já existe.');
        }
    })
    .catch(err => {
        console.error('Erro ao sincronizar a tabela Users:', err);
    });



module.exports = User;
