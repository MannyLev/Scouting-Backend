const { PrismaClient } = require('@prisma/client');

// Returns a particular team's stat for a particular match
export async function getMatchStat(tournamentId, teamNumber, matchNumber, field) {
    const matchStat = await Prisma.TeamPerformance.findUnique({
        where: {
            match: {tournamentId: tournamentId, matchNumber: matchNumber},
            teamNumber: teamNumber
        }
    })

    return matchStat.scoutInput[field];
}