const { PrismaClient } = require('@prisma/client');
const express = require('express');

var bodyParser = require('body-parser');

const app = express();
const prisma = new PrismaClient();
app.use(bodyParser.json()); 

// Adds a team performance to the database
app.post('/addTeamMatch', async (req, res) => {
    const json = req.body; 

    console.log(json); 

    // TODO: Require that a schema must be written with a teamNumber and a matchNumber in specified way

    // Creates a new team performance based on the input given in the json file from the scout
    // The json file will be converted from the qr code and fed to this as input
    const teamPerf = await prisma.TeamPerformance.create({
      data: {
        teamNumber: json.teamNumber,
        scoutInput: json.scoutInput,
        matchNumber: json.matchNumber
      },
    }); 

    // TODO: This may be for typescript only
    // Creates a match if one does not exist with needed match number
    // TODO: See if tournament ID needs to be an input

    // Sees if match exists
      const matchExists = await Prisma.Match.findUnique({
          where: {
              match: {tournamentId: tournamentId},
              matchNumber: matchNumber
          }
      })

  if (matchExists == null) {
    const matchCreation = await prisma.Match.create({
      matchnumber: json.matchNumber,
      teams: [teamPerf],
      Tournament: tournamentID,
      tournamentID: tournamentID
    })
  }
  else {
    const matchUpdate = await prisma.Match.update({
      where: {
        matchId: matchExists.matchId
      },
      data: {
        teams: [teamPerf]
      }
    })
  }

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
}),

// Adds a new tournament
app.post('/addTournament', async (req, res) => {
  const json = req.body;

  const tournament = await prisma.Tournament.create({
    data: {
    }
  })
})

// TODO: Add queries or requests


module.exports = app; 