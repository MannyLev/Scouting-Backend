import { Prisma } from '@prisma/client'
import express from 'express'

var bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json()); 

// Adds a team performance to the 
app.post('/addTeamMatch', async (req, res) => {
    const json = req.body; 

    // TODO: Require that a schema must be written with a teamNumber and a matchNumber in specified way

    const posts = await prisma.post.findMany({
        where: {}
    })
    // res.json(posts)

    // Creates a new team performance based on the input given in the json file from the scout
    // The json file will be converted from the qr code and fed to this as input
    const teamPerf = await prisma.teamPerformance.create({
      data: {
        teamNumber: json.teamNumber,
        scoutInput: json
      },
    }); 

    // TODO: This may be for typescript only
    // Creates a match if one does not exist with needed match number
    // TODO: See if tournament ID needs to be an input
    const updatePostTitleOrCreateIfNotExist =
  Prisma.validator<Prisma.MatchUpsertWithWhereUniqueWithoutAuthorInput>(tournamentID)({
    where: {
      tournamentID: tournamentID,
      matchNumber: json.matchNumber
    },
    update: {
      teams: [teamPerf]
    },
    create: {
      matchnumber: json.matchNumber,
      teams: [teamPerf],
      Tournament: tournamentID,
      tournamentID: tournamentID
    },
  })

  // Gets the match previously created
  const createdMatch = await Prisma.Match.findUnique({
    where: {
        tournamentId: tournamentId,
        matchNumber: json.matchNumber
    }
})

  // Update the previously created teamPerf to include the created match
  const updateTeamPerf = await prisma.TeamPerformance.update({
    where: {
      id: teamPerf.id
    },
    data: {
      Match: createdMatch
    },
  })
}) 