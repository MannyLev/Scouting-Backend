const { PrismaClient } = require("@prisma/client");
const express = require("express");

var bodyParser = require("body-parser");

const app = express();
const prisma = new PrismaClient();
app.use(bodyParser.json());

// Adds a team performance to the database
app.post("/addTeamMatch", async (req, res) => {
  const json = req.body;

  console.log(json);

  // TODO: Require that a schema must be written with a teamNumber and a matchNumber in specified way

  // Creates a new team performance based on the input given in the json file from the scout
  // The json file will be converted from the qr code and fed to this as input
  const teamPerf = await prisma.TeamPerformance.create({
    data: {
      teamNumber: json.teamNumber,
      scoutInput: json.scoutInput,
    },
  });

  // Creates a match if one does not exist with needed match number
  // TODO: See if tournament ID needs to be an input

  // Sees if match exists
  const matchExists = (await prisma.Match.findMany({
    where: {
      tournament: { title: json.tournamentName },
      matchNumber: json.scoutInput.matchNumber,
    },
  }))[0];

  console.log(matchExists);

  // Creates one if it doesn't
  if ((matchExists == null) || (matchExists == undefined)) {
    const matchCreation = await prisma.Match.create({
      data: {
        matchNumber: json.scoutInput.matchNumber,
        teams: {
          connect: {id: teamPerf.id},
        },
      }
    });

    // Sees if tournament exists
    const tournamentExists = (await prisma.Tournament.findMany({
      where: {
        title: json.tournamentName,
      },
    }))[0];

    console.log(tournamentExists); 

    if ((tournamentExists == null) || (tournamentExists == undefined)) {
      const tournamentCreation = await prisma.Tournament.create({
        data: {
          title: json.tournamentName,
        }
      });
      const matchUpdateTournament = await prisma.Match.update({
        where: {
          id: matchCreation.id,
        },
        data: {
          tournamentId: {
            connect: {id: tournamentCreation.id},
          },
          tournament: {
            connect: tournamentCreation,
          },
        },
      });
      const updateTournament = await prisma.Tournament.update({
        where: {
          id: tournamentCreation.tournamentId,
        },
        data: {
          matches: {
            connect: matchCreation,
          },
        },
      });
    } else {
      const tournamentUpdate = await prisma.Tournament.update({
        where: {
          id: tournamentExists.id,
        },
        data: {
          matches: {
            connect: matchCreation,
          },
        },
      });

      const matchUpdateTournament = await prisma.Match.update({
        where: {
          id: matchCreation.id,
        },
        data: {
          tournamentId: tournamentUpdate.tournamentId,
          tournament: {
            connect: tournamentUpdate,
          },
        },
      });
    }

    const updateTournament = await prisma.Tournament.update({
      where: {
        id: tournamentUpdate.tournamentId,
      },
      data: {
        matches: {
          connect: matchCreation,
        },
      },
    });

    // Update tournament with match
  } else {
    const matchUpdate = await prisma.Match.update({
      where: {
        id: matchExists.id,
      },
      data: {
        teams: {
          connect: {id: teamPerf.id},
        },
      },
    });

    const updateTournament = await prisma.Tournament.update({
      where: {
        id: matchUpdate.tournamentId,
      },
      data: {
        matches: {
          connect: matchUpdate,
        },
      },
    });
  }
  res.send(); 
}),

  // Adds a new tournament
  app.post("/addTournament", async (req, res) => {
    const json = req.body;

    const tournament = await prisma.Tournament.create({
      data: {},
    });
  });

// TODO: Add queries or requests

module.exports = app;
