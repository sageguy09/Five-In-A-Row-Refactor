import { Server } from 'boardgame.io/server';
import FirGame from './src/components/firGame'

const PORT = process.env.PORT || 8000;
const server = Server({games: [FirGame]});
server.run(PORT, () => {
    console.log(`Serving at: http://localhost:${PORT}/`)
})