const { User } = require('../models/user'); // Supondo que você tenha o modelo User definido em models/index.js

const isAdmin = async (req, res, next) => {
    try {
        // Busca o usuário pelo ID na base de dados usando Sequelize
        const user = await User.findOne({ where: { ID: req.ID } });

        if (user) {
            if (user.PERFIL === 'Admin') {
                next(); // Se o usuário for Admin, continua para a próxima função middleware
            } else {
                return res.status(403).send({ error: 'Acesso negado. Requer PERFIL de Admin.' });
            }
        } else {
            return res.status(404).send({ error: 'Usuário não encontrado.' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: 'Ocorreu um erro no sistema.' });
    }
};

module.exports = isAdmin;
