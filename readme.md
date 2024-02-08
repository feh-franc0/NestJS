# pnpm i
# .env: 
  ```js
  DATABASE_URL="postgresql://<username>:<password>@<hostname>:<port>/<database>?schema=public"
  JWT_PRIVATE_KEY=""
  JWT_PUBLIC_KEY=""
  ```
# docker-compose up -d
# pnpm prisma migrate dev
# pnpm prisma studio
# pnpm run test
# pnpm run test:e2e
# pnpm run start:dev