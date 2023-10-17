import { Prisma } from "@prisma/client";

export async function getInputList(teamNumber, tournamentId, field) {
    const stats = await Prisma.TeamPerformance.findMany({
        where: {
            teamNumber: teamNumber,
            tournamentId: tournamentId
        }
    })
    statList = ""
    for (let i = 0; i < stats.length(); i++) {
        const currentStats = stats[i];
        statList = statList + ", " + stats[i]
    }
    return 
}