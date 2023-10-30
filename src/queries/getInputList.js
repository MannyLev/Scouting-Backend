const { PrismaClient } = require('@prisma/client');

// Returns all of the numbers a given team got for a particular stat
export async function getInputList(teamNumber, tournamentId, field) {
    const stats = await Prisma.TeamPerformance.findMany({
        where: {
            teamNumber: teamNumber,
            match: {tournamentId: tournamentId}
        }
    })
    const statArray = new Array[stats.length()];
    for (let i = 0; i < stats.length(); i++) {
        currentScore = stats[i];
        statrray[i] = currentScore.scoutInput[field];
    }
    return statArray;
}