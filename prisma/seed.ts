// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Iniciando o processo de seed...`);

  const adminEmail = 'admin@example.com';
  
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin',
      // IMPORTANTE: Esta senha é apenas para desenvolvimento local.
      // Em um ambiente de produção, você deveria armazenar um hash da senha.
      password: 'password', 
    },
  });

  console.log(`Usuário Admin criado/verificado: ${admin.email}`);
  console.log(`Seed finalizado.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });