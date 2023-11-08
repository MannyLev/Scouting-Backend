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
      // matchNumber: json.matchNumber
    },
  });

  // TODO: This may be for typescript only
  // Creates a match if one does not exist with needed match number
  // TODO: See if tournament ID needs to be an input

  // Sees if match exists
  const matchExists = await prisma.Match.findUnique({
    where: {
      tournament: { title: json.tournamentName },
      matchNumber: json.matchNumber,
    },
  });

  // Creates one if it doesn't
  if (matchExists == null) {
    const matchCreation = await prisma.Match.create({
      matchnumber: json.matchNumber,
      teams: [teamPerf],
    });

    // Sees if tournament exists
    const tournamentExists = await prisma.Tournament.findUnique({
      where: {
        title: json.tournamentName,
      },
    });

    if (tournamentExists == null) {
      const tournamentCreation = await prisma.Tournament.create({
        title: json.tournamentName,
      });
      const matchUpdateTournament = await prisma.Match.update({
        where: {
          matchId: matchExists.matchId,
        },
        data: {
          tournamentId: {
            push: tournamentCreation.tournamentId,
          },
          tournament: {
            push: tournamentCreation,
          },
        },
      });
      const updateTournament = await prisma.Tournament.update({
        where: {
          tournamentId: tournamentCreation.tournamentId,
        },
        data: {
          matches: {
            push: matchCreation,
          },
        },
      });
    } else {
      const tournamentUpdate = await prisma.Tournament.update({
        where: {
          tournamentId: tournamentExists.tournamentId,
        },
        data: {
          teams: {
            push: matchCreation,
          },
        },
      });

      const matchUpdateTournament = await prisma.Match.update({
        where: {
          matchId: matchExists.matchId,
        },
        data: {
          tournamentId: tournamentUpdate.tournamentId,
          tournament: {
            push: tournamentUpdate,
          },
        },
      });
    }

    const updateTournament = await prisma.Tournament.update({
      where: {
        tournamentId: tournamentUpdate.tournamentId,
      },
      data: {
        matches: {
          push: matchCreation,
        },
      },
    });

    // Update tournament with match
  } else {
    const matchUpdate = await prisma.Match.update({
      where: {
        matchId: matchExists.matchId,
      },
      data: {
        teams: {
          push: teamPerf,
        },
      },
    });

    const updateTournament = await prisma.Tournament.update({
      where: {
        tournamentId: matchUpdate.tournamentId,
      },
      data: {
        matches: {
          push: matchUpdate,
        },
      },
    });
  }

  //   // Gets the match previously created
  //   const createdMatch = await Prisma.Match.findUnique({
  //     where: {
  //         tournamentId: tournamentId,
  //         matchNumber: json.matchNumber
  //     }
  // })

  //   // Update the previously created teamPerf to include the created match
  //   const updateTeamPerf = await prisma.TeamPerformance.update({
  //     where: {
  //       id: teamPerf.id
  //     },
  //     data: {
  //       Match: createdMatch
  //     },
  //   });
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
