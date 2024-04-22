import { envs } from "../../config";

export class DiscordService{
    
    private readonly discordWebHookUrl: string = envs.DISCORD_WEBHOOK_URL;

    constructor(){}

    async notify(message: string){
        const body = {
            content: message,
            embeds: [
                {
                    image: {
                        url: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDE4NjE1c3J6cGRkdm5wcm9pc2Y0bno1ZmJoNXQ0bjk1OTRsaGw5aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CuuSHzuc0O166MRfjt/giphy.gif'
                    }
                }
            ]
        }

        const response = await fetch( this.discordWebHookUrl, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if( !response.ok){
            console.log('Error sending message to discord');
            return false;
        }
        return true;
    }


}