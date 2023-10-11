import { fdatasync } from "fs"
import { prisma } from "./db"

const prisma = new PrismaClient().$extends({
    model: {
      Team: {

        },
    }
  })

async function main() {
  // ... you will write your Prisma Client queries here

  const latestTournament = await prisma.tournament.findFirst({
    where: {
        title: "Match 1"
    }
  })

  const teamArray[] = await prisma.tournament.findUnique( {
    where: {
        tournament.match.teamperformance.teamName;
    }
  })

  const newTeam = await prisma.t
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