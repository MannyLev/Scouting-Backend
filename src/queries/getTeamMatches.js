import { Prisma } from "@prisma/client";

// Returns the number of matches a given team is in
export async function getTeamMatches(teamNumber, tournamentId) {
    const mentions = await Prisma.TeamPerformance.findMany({
        where: {
            teamNumber: teamNumber,
            match: {tournamentId: tournamentId}
        },
    })
    return mentions.length();
}