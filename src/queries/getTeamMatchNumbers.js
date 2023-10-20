export async function getTeamMatchNumbers(teamNumber, tournamentId) {

    // Returns a list of the team's matches as a string
    const matchNumbers = await Prisma.TeamPerformance.findMany({
        where: {
            teamNumber: teamNumber,
            match: {tournamentId: tournamentId}
        }
    })
    const matchList = new Array[matchNumbers.length()]
    for (let i = 0; i < matchNumbers.length(); i++) {
        matchList[i] = matchNumber[i];
    }
    return matchList;
}