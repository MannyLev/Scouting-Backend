import { Prisma } from "@prisma/client";

export async function getTournamentMatches(tournamentId) {

    const numberOfMatches = await Prisma.MatchScalarFieldEnum.findMany({
        where: {
            tournamentId: tournamentId
        },
    })
    return numberOfMatches.length();
}