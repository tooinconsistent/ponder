FROM debian:11.6-slim as builder

WORKDIR /app

RUN apt update
RUN apt install curl unzip -y

RUN curl https://bun.sh/install | bash
RUN /root/.bun/bin/bun upgrade --canary

COPY package.json .
COPY bun.lockb .

RUN /root/.bun/bin/bun install --production

# Runtime environment

FROM debian:11.6-slim

WORKDIR /app

COPY --from=builder /root/.bun/bin/bun bun
COPY --from=builder /app/node_modules node_modules

COPY src src
COPY tsconfig.json .

ENV ENV production
CMD ["./bun", "src/main.ts"]

EXPOSE 3000