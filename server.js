import path from 'path';
import serve from 'koa-static';
import { historyApiFallback } from 'koa2-connect-history-api-fallback'
import { Server } from 'boardgame.io/server';
import FirGame from './src/components/firGame'


const { REACT_APP_SERVER_PORT } = process.env;
const PORT = REACT_APP_SERVER_PORT || process.env.PORT || 8000;
const server = Server({games: [FirGame]});

const { app } = server;

const root = path.join(__dirname, '../');

app.use(
    historyApiFallback({ index: 'index.html', whiteList: ['/api', '/games']})
)

app.use(serve(root))

server.run(PORT, () => {
    console.log(`Serving at: http://localhost:${PORT}/`)
})
