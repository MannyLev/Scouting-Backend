import { fdatasync } from "fs"
import { prisma } from "./db"
import { averageOfTeams } from "./queries/statistics"

async function main() {
  // ... you will write your Prisma Client queries here


  for(let i = 0; i < ; i++) {

  }

  const newTeam = await prisma.

  
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