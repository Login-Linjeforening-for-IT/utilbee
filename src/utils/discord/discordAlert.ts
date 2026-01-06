import type { Data, DiscordAlertProps } from 'utilbee/utils'

export default async function discordAlert({
    application,
    description,
    type = '',
    ping = false,
    criticalRole,
    webhookURL
}: DiscordAlertProps): Promise<number> {
    try {
        const data: Data = {
            embeds: [
                {
                    title: `🐝 ${application} ${`${type.toUpperCase()} `}🐝`,
                    description: description,
                    color: 0xff0000,
                    timestamp: new Date().toISOString()
                }
            ]
        }

        if (ping) {
            data.content = `🚨 <@&${criticalRole}> 🚨`
        }

        const response = await fetch(webhookURL ?? '', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error(await response.text())
        }

        return response.status
    } catch (error) {
        console.log(error)
        return 500
    }
}
