const express = require('express');
const { User } = require('../models'); // Assumindo que você tem um modelo Sequelize para 'User'
const authMiddleware = require('../middlewares/auth');
const isAdmin = require("../middlewares/admin");
const router = express.Router();

router.use(authMiddleware);


// Verifica se está autenticado e retorna o usuário
router.get('/', (req, res) => {
    res.send({ ok: true, user: req.ID });
});

// Rota de Listagem de Usuários com CPF, NOME e EMAIL
router.get('/list', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['ID', 'CPF', 'NOME', 'EMAIL', 'PERFIL']
        });

        res.send({ USERS: users });
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: 'Erro ao buscar usuários, tente novamente!' });
    }
});

// Rota para deletar um usuário pelo ID
router.delete('/delete/:id', isAdmin, async (req, res) => {
    const id = parseInt(req.params.id, 10); // Converte o ID de string para inteiro

    try {
        const deleteResult = await User.destroy({ where: { ID: id } });

        if (deleteResult === 0) {
            return res.status(404).send({ error: 'Usuário não encontrado!' });
        }

        res.send({ message: 'Usuário excluído com sucesso.' });
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: 'Erro ao excluir usuário, tente novamente!' });
    }
});

// Rota para atualizar um usuário pelo ID
router.put('/update/:id', isAdmin, async (req, res) => {
    const id = parseInt(req.params.id, 10); // Converte o ID de string para inteiro
    const { CPF, NOME, EMAIL, PERFIL } = req.body;

    try {
        const [updateResult] = await User.update(
            { CPF, NOME, EMAIL, PERFIL },
            { where: { ID: id } }
        );

        if (updateResult === 0) {
            return res.status(404).send({ error: 'Usuário não encontrado!' });
        }

        res.send({ message: 'Usuário atualizado com sucesso.' });
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: 'Erro ao atualizar usuário, tente novamente!' });
    }
});

module.exports = app => app.use('/USERS', router);
