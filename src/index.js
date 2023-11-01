const { PrismaClient } = require('@prisma/client');
const app = require('./server'); 

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here

  app.listen(3000, () => console.log("Server started!")); 
}

main()
  .then(async () => {
    await prisma.$disconnect()


  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })