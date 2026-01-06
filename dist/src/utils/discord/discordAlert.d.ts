import type { DiscordAlertProps } from 'utilbee/utils';
export default function discordAlert({ application, description, type, ping, criticalRole, webhookURL }: DiscordAlertProps): Promise<number>;
