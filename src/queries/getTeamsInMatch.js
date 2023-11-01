const { PrismaClient } = require('@prisma/client');

// Gets the team numbers in a match
export async function getTeamsInMatch(matchNumber, tournamentId) {
    const match = await Prisma.Match.findUnique({
        where: {
            match: {tournamentId: tournamentId},
            matchNumber: matchNumber
        }
    })
    return match.teams.teamNumber;
}