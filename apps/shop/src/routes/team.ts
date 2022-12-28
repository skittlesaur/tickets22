import express from 'express'
import getRandomPlayer from '../controllers/players/random-player'
import getAllTeams from '../controllers/teams/get-all-teams'
import getTeamGames from '../controllers/teams/get-team-games'
import getTeamPlayers from '../controllers/teams/get-team-players'

const router = express.Router()

router.get('/', getAllTeams)
router.get('/:teamId/games', getTeamGames)
router.get('/:teamId/players', getTeamPlayers)
router.get('/:teamId/players/random', getRandomPlayer)


export default router