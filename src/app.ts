import express, { Request } from 'express';
import { envs } from './config';
import { GitHubController } from './presentation/github/controller';
import { GitHubSha256Middleware } from './presentation/middlewares/github-sha256';

( () => {
    main();
})()

function main(){
    const app = express();

    app.use( express.json() );
    app.use( GitHubSha256Middleware.verifySignature );

    const gitHubController = new GitHubController();

    app.post('/api/github', gitHubController.webHookHandler )

    app.listen( envs.PORT , () => {
        console.log(`Server running on port ${envs.PORT}`);
    });
}