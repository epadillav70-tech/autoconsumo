Backend (NestJS + Prisma)

Instrucciones rápidas:
- Instalar dependencias: npm ci
- Variables de entorno: .env (DATABASE_URL, JWT_SECRET, S3 credentials, STRIPE keys)
- Migraciones Prisma: npx prisma migrate dev
- Ejecutar: npm run start:dev

Estructura: src/modules/(auth,listings,users,media,...)
