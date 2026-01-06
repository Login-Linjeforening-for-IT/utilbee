import type { SlowQueryProps } from 'utilbee/utils';
export default function alertSlowQuery({ application, duration, name, cacheTTL, webhookURL, criticalRole }: SlowQueryProps): Promise<void>;
