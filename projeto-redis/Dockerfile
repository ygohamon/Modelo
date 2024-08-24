FROM redis:alpine

RUN apk update && \
    apk add --no-cache iproute2 vim

COPY ./scripts/redis.conf /usr/local/etc/redis/redis.conf
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]
