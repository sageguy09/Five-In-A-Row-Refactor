import path from 'path';
import serve from 'koa-static';
import { historyApiFallback } from 'koa2-connect-history-api-fallback'
import { Server } from 'boardgame.io/server';
import FirGame from './src/components/firGame'



const PORT = process.env.PORT || 8000;
const server = Server({games: [FirGame]});

const { app } = server;


const root = path.join(__dirname, './build');

app.use(
    historyApiFallback({ index: 'index.html', whiteList: ['/api', '/games'] })
  );

app.use(serve(root))

//app.use(serve(path.join(__dirname, './build/index.html')))
server.run(PORT, () => {
    console.log(`Serving at: http://localhost:${PORT}/`)
})
// server.run({ 
//     port: PORT, 
//     // callback: () => {
//     //     console.log(`Serving at: http://localhost:${PORT}/`, server)
//     // },
//     lobbyConfig: {
//     port: PORT,
//     apiCallback: () => {
//         console.log(`lobby serving at: http://localhost:${PORT}/`)
//     }
// }
// });

