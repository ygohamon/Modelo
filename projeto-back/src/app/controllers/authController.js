const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../../modules/mailer');
const authConfig = require('../../config/auth.json');
const { User } = require('../models'); // Supondo que o modelo User esteja definido no arquivo models/index.js

function generateTOKEN(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

async function checkEMAILExists(EMAIL) {
    const count = await User.count({ where: { EMAIL } });
    return count > 0;
}

async function checkCPFExists(CPF) {
    const count = await User.count({ where: { CPF } });
    return count > 0;
}

router.post('/register', async (req, res) => {
    const { EMAIL, SENHA, NOME, CPF, ORGAO, PERFIL } = req.body;

    try {
        // Verificar se o usuário já existe
        const EMAILExists = await checkEMAILExists(EMAIL);
        const CPFExists = await checkCPFExists(CPF);

        if (EMAILExists) return res.status(400).send({ error: 'EMAIL já cadastrado!' });
        if (CPFExists) return res.status(400).send({ error: 'CPF já cadastrado!' });

        const newUser = await User.create({ CPF, NOME, EMAIL, PERFIL, SENHA });

        const TOKEN = generateTOKEN({ id: newUser.ID }); // Ajuste: Certifique-se de que está utilizando 'ID'
        res.status(200).send({ USER: newUser.ID, TOKEN });
    } catch (error) {
        return res.status(400).send({ error: 'Falha no Cadastro!!!' });
    }
});

router.post('/login', async (req, res) => {
    const { EMAIL, SENHA } = req.body;

    try {
        const USER = await User.findOne({ where: { EMAIL } });

        if (!USER) return res.status(400).send({ error: 'Usuário não existe!' });

        const isMatch = await bcrypt.compare(SENHA, USER.SENHA);
        if (!isMatch) return res.status(400).send({ error: 'SENHA Inválida!' });

        const TOKEN = generateTOKEN({ id: USER.ID });

        res.send({ USUARIO: { ID: USER.ID, NOME: USER.NOME, EMAIL: USER.EMAIL, PERFIL: USER.PERFIL }, TOKEN }); // Ajuste: Não enviar SENHA
    } catch (err) {
        return res.status(500).send({ error: 'Erro no servidor!, pode ser a formatação da requisição do front' });
    }
});

router.post('/forgot_password', async (req, res) => {
    const { EMAIL } = req.body;

    try {
        const USER = await User.findOne({ where: { EMAIL } });

        if (!USER) return res.status(400).send({ error: 'Usuário não existe!' });

        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        const now = new Date();
        now.setHours(now.getHours() + 1);

        USER.RESETCODE = resetCode;
        USER.RESETEXPIRED = now;
        await USER.save();

        await mailer.sendMail({
            to: EMAIL,
            from: 'projeto@projeto.com.br',
            subject: 'Codigo de Verificação do PROJETO',
            template: 'auth/forgot_password',
            context: { resetCode },
        });

        return res.send({ message: "Código enviado com sucesso." });
    } catch (err) {
        return res.status(500).send({ error: 'Erro ao tentar recuperar a SENHA. Tente novamente!' });
    }
});

router.post('/verify_code', async (req, res) => {
    const { EMAIL, CODE } = req.body;

    try {
        const USER = await User.findOne({ where: { EMAIL } });

        if (!USER) return res.status(400).send({ error: 'Usuário não existe!' });
        if (!USER.RESETCODE || CODE !== USER.RESETCODE) return res.status(400).send({ error: 'Código inválido!' });

        const now = new Date();
        if (!USER.RESETEXPIRED || now > USER.RESETEXPIRED) return res.status(400).send({ error: 'Código expirado, por favor gere um novo código!' });

        res.send({ message: "Código verificado com sucesso. Prossiga para redefinir a SENHA." });
    } catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuário!' });
    }
});

router.post('/reset_password', async (req, res) => {
    const { EMAIL, CODE, SENHA } = req.body;

    try {
        const USER = await User.findOne({ where: { EMAIL } });

        if (!USER) return res.status(400).send({ error: 'Usuário não existe!' });
        if (!USER.RESETCODE || CODE !== USER.RESETCODE) return res.status(400).send({ error: 'Código inválido!' });

        const now = new Date();
        if (!USER.RESETEXPIRED || now > USER.RESETEXPIRED) return res.status(400).send({ error: 'Código expirado, por favor gere um novo código!' });

        USER.SENHA = await bcrypt.hash(SENHA, 10);
        USER.RESETCODE = null;
        USER.RESETEXPIRED = null;
        await USER.save();

        res.send({ message: "SENHA alterada com sucesso." });
    } catch (err) {
        return res.status(500).send({ error: 'Erro ao atualizar a SENHA!' });
    }
});

module.exports = app => app.use('/auth', router);
