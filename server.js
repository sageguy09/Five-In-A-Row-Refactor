import path from 'path';
import serve from 'koa-static';
import { historyApiFallback } from 'koa2-connect-history-api-fallback'
import { Server } from 'boardgame.io/server';
import FirGame from './src/components/firGame'



const PORT = process.env.PORT || 8000;
const server = Server({games: [FirGame]});

const { app } = server;


const root = path.join(__dirname, './build');



app.use(serve(root))

server.run(PORT, () => {
    console.log(`Serving at: http://localhost:${PORT}/`)
})
