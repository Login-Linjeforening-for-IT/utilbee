import fs from 'node:fs';
import path from 'node:path';
import parse from "./parse.js";
export default function load(options = {}) {
    const envPath = path.resolve(process.cwd(), options.path ?? '.env');
    if (!fs.existsSync(envPath)) {
        return { error: new Error(`File not found: ${envPath}`) };
    }
    try {
        const parsed = parse(fs.readFileSync(envPath, { encoding: options.encoding ?? 'utf8' }));
        for (const key in parsed) {
            const value = parsed[key];
            if (value !== undefined) {
                if (options.override || process.env[key] === undefined) {
                    process.env[key] = value;
                }
            }
        }
        return { parsed };
    }
    catch (error) {
        return { error };
    }
}
