const { PrismaClient } = require('@prisma/client');

export async function getTournamentMatches(tournamentId) {

    const numberOfMatches = await Prisma.Match.findMany({
        where: {
            tournamentId: tournamentId
        },
    })
    return numberOfMatches.length();
}