/* eslint-disable @stylistic/semi */

declare module 'utilbee/utils' {
    export interface SlowQueryProps {
        application: string
        duration: number
        name: string
        cacheTTL: number
        webhookURL: string
        criticalRole: string
    }
    export interface Embed {
        title: string
        description: string
        color: number
        timestamp: string
    }

    export interface Data {
        content?: string
        embeds: Embed[]
    }

    export interface DiscordAlertProps {
        application: string
        description: string
        type: 'get' | 'post' | ''
        ping: boolean
        criticalRole: string
        webhookURL: string
    }

    export default async function alertSlowQuery(props: SlowQueryProps): Promise<void>;
    export default async function discordAlert(props: DiscordAlertProps): Promise<number>;
}
