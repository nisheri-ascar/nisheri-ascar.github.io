# ---- Stage 1: Build the site with Zola ----
FROM alpine:latest AS builder

RUN apk add --no-cache zola

WORKDIR /app
COPY . .

RUN zola build

# ---- Stage 2: Serve with Caddy ----
FROM caddy:alpine

COPY --from=builder /app/public /srv/public
COPY caddy.json /etc/caddy/caddy.json

CMD ["caddy", "run", "--config", "/etc/caddy/caddy.json"]
