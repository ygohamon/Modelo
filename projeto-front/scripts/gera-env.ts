import { writeFile, existsSync, mkdirSync } from 'fs';
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

require('dotenv').config();

const environment = argv.environment;
const isProd = environment === 'prod' || environment === 'production';

const folder = './src/environments';
const targetPath = environment === 'dev' || environment === 'development' ?
    `${folder}/environment.ts` :
    environment === 'prod' || environment === 'production' ?
        `${folder}/environment.prod.ts` :
        `${folder}/environment.${environment}.ts`;

// Acessa as variáveis de ambiente usando a sintaxe de colchetes
const API_URL = process.env['API_URL'] || '';
const MAPS_KEY = process.env['MAPS_KEY'] || 'Definir variavel de ambiente no projeto-front.env';
const PASSWORD_ENCRYPT_AES = process.env['PASSWORD_ENCRYPT_AES'] || 'Definir variavel de ambiente no projeto-front.env';

const envConfigFile = `
// Este arquivo foi gerado automaticamente pelo script ./scripts/gera-env.ts
// com o objetivo de utilizar de forma automatica as variaveis do sistema

export const environment = {
  production: ${isProd},
  MAPS_KEY: "${MAPS_KEY}",
  API_URL: "${API_URL}",
  PASSWORD_ENCRYPT_AES: "${PASSWORD_ENCRYPT_AES}",
};
`;

if (!existsSync(folder)){
    mkdirSync(folder);
}

writeFile(targetPath, envConfigFile, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Arquivos environment.ts gerados em ${targetPath}`);
    }
});
