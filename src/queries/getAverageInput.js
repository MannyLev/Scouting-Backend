import { Prisma } from "@prisma/client";

// Check if there's a bunch of null entries to the scores
// Returns the average of a given stat for a given team
export async function getAverageInput(teamNumber, tournamentId, field) {
    const stats = await Prisma.TeamPerformance.findMany({
        where: {
            teamNumber: teamNumber,
            match: {tournamentId: tournamentId}
        },
    }); 
    let statTotal = 0;
    for (let i = 0; i < stats.length(); i++) {
        const currentStat = stats[i];
        statTotal += currentStat.scoutInput[field]
    }
    return statTotal / stats.length();
}