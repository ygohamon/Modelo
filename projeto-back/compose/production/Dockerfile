# Utiliza a imagem base node:21-alpine
FROM node:21-alpine

# Define o autor da imagem Docker
LABEL authors="Ygo Hamon"

WORKDIR /projeto-back

RUN apk update && \
    apk add python3 make g++ iproute2 vim procps musl-dev && \
    npm install -g pm2 && \
    pm2 install pm2-server-monit && \
    pm2 update

# Instala as dependências
COPY package*.json ./
RUN npm install

# Copia a aplicação para o container
COPY . .

# Configura os scripts de entrypoint e start
COPY ./compose/production/entrypoint /entrypoint
RUN sed -i 's/\r//' /entrypoint
RUN chmod +x /entrypoint

COPY ./compose/production/start /start
RUN sed -i 's/\r//' /start
RUN chmod +x /start

ENTRYPOINT ["/entrypoint"]
