const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const path = require('path'); // Importa o módulo path
require('dotenv').config();

const transport = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});
transport.use('compile', hbs({
    viewEngine: {
        extName: '.html', // Especifica a extensão dos seus templates
        partialsDir: path.resolve('./src/resources/mail/'), // Diretório dos templates
        layoutsDir: path.resolve('./src/resources/mail/'), // Mesmo diretório para layouts, mesmo que não sejam usados
        defaultLayout: '', // Especifica que não há um layout padrão
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
}));

module.exports = transport;