import { Prisma } from '@prisma/client'
import express from 'express'

var bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json()); 

app.post('/addTeamMatch', async (req, res) => {
    const json = req.body; 

    // data validation


    const posts = await prisma.post.findMany({
        where: {}
    })
    // res.json(posts)

    await prisma.teamPerformance.create({
        data: {
          teamNumber: 
          scoutInput: json;
        },
      })
}) 