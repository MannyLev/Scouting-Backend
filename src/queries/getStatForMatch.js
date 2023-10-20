export async function getStatForMatch(tournamentId, matchNumber, field) {
    const match = await Prisma.Match.findUnique({
        where: {
            tournamentId: tournamentId,
            matchNumber: matchNumber
        }
    })
    
}