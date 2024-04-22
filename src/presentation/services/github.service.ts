import { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";

export class GitHubService{

    contructor(){}

    onStart( payload: GitHubStarPayload): string{
        let message: string = '';
        const { action, repository, starred_at, sender } = payload;

        message = `User ${sender.login} ${ action } star on ${ repository.full_name } at ${starred_at}`;
        
        return message;
    }

    onIssue( payload: GitHubIssuePayload): string{
        let message = '';
        const { issue, action } = payload;

        if( action === 'opened'){
            message = `An issue was oppened with this title ${ issue.title }`;
        }
        else if (action === 'closed') {
            message = `An issue was closed by ${issue.user.login }`;
        }
        else if (action === 'reopened') {
            message = `An issue was reopened by ${issue.user.login }`;
        }
        else{
            message = `Unhandled action for issue event ${action}`;
        }

        return message;
    }

}