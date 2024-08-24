# Etapa 1: Construir a aplicação Angular
FROM node:21-alpine as builder

LABEL authors="Ygo Hamon"

WORKDIR /projeto-front

RUN npm install -g @angular/cli@17.2.2

COPY package*.json ./
COPY *.lock ./

RUN npm install

# Copia a aplicacao para o container
COPY . .

# Gera os arquivos environment.ts
RUN export $(grep -v '^#' .env/production/front.env | xargs) && \
    npm run build:env && \
    ls -lah && \
    cat ./src/environments/environment.ts && \
    cat ./src/environments/environment.prod.ts

# Executa o build da aplicação Angular
RUN npm run build

# Verificar se a pasta dist foi criada
RUN ls -l /projeto-front/dist/projeto

# Etapa 2: Configurar o Nginx para servir a aplicação
FROM nginx:alpine

# Instala o OpenSSL
RUN apk add --no-cache openssl

# Cria os certificados auto assinados
RUN openssl genrsa -des3 -passout pass:xmppbx -out server.pass.key 2048 && \
    openssl rsa -passin pass:xmppbx -in server.pass.key -out server.key && \
    rm server.pass.key && \
    openssl req -new -key server.key -out server.csr -subj "/C=BR/ST=PB/L=JOAO PESSOA/O=MPPB/OU=MPPB/CN=SIAP" && \
    openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

RUN mkdir -p /etc/ssl/certs/private/ && \
    cp server.crt /etc/ssl/certs/private/siap.crt && \
    cp server.key /etc/ssl/certs/private/siap.key && \
    rm server.crt server.csr server.key

RUN openssl dhparam -out /etc/ssl/certs/private/dhparam.pem 4096

# Copia arquivos construídos do builder
COPY --from=builder /projeto-front/dist/projeto /usr/share/nginx/html

# Copia arquivos de configuração do Nginx
COPY ./compose/production/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./compose/production/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Copia variáveis de ambiente
COPY .env/production/front.env /etc/nginx/.env

# Depuração: Imprimir variáveis de ambiente
RUN cat /etc/nginx/.env

# Altera o endereço do arquivo de configuração do Nginx para apontar para o servidor
RUN export $(grep -v '^#' /etc/nginx/.env | xargs) && \
    echo "Valor de ENDERACO_NGINX_BACK: $ENDERACO_NGINX_BACK" && \
    sed -i "s|server localhost:4000;|server ${ENDERACO_NGINX_BACK};|g" /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
