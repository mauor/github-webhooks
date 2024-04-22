import { Request, Response } from "express";
import { GitHubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";

export class GitHubController{

    constructor(
        private readonly gitHubService = new GitHubService(),
        private readonly discordService = new DiscordService(),
    ){}

    webHookHandler = (req: Request, res: Response) => {
        const gitHubEvnet = req.header('x-github-event') ?? 'unknown';
        // const signature = req.header('x-hub-signature-256') ?? 'unknown';
        const payload = req.body;
        let message: string;

        switch( gitHubEvnet ){
            case 'star':
                message = this.gitHubService.onStart( payload );
                break;
                case 'issues':
                    message = this.gitHubService.onIssue( payload );
                break;
            default:
                message = `Unknow event: ${gitHubEvnet}`;
        }

      
        this.discordService.notify( message )
        .then( () => res.status(202).send('accepted') )
        .catch ( () => res.status(500).json({error: 'Internal Server Error'}))
        
    }
}