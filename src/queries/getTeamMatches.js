import { Prisma } from "@prisma/client";

// Finds the number of matches a given team is in
export async function getTeamMatches(userName, tournamentId) {
    const mentions = await Prisma.teamPerformance.findMany({
        where: {
            name: userName,
            tournamentId: tournamentId
        },
    })
    return mentions.length();
}