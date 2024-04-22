import express, { Request } from 'express';
import { envs } from './config';
import { GitHubController } from './presentation/github/controller';

( () => {
    main();
})()

function main(){
    const app = express();

    app.use( express.json() );

    const gitHubController = new GitHubController();

    app.post('/api/github', gitHubController.webHookHandler )

    app.listen( envs.PORT , () => {
        console.log(`Server running on port ${envs.PORT}`);
    });
}