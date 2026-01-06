import fs from 'node:fs';
import path from 'node:path';
import parse from "./parse.js";
export default function load(options = {}) {
    if (typeof window !== 'undefined') {
        return { parsed: {} };
    }
    const paths = Array.isArray(options.path) ? options.path : [options.path ?? '.env'];
    const parsedAll = {};
    for (const file of paths) {
        const envPath = path.resolve(process.cwd(), file);
        if (!fs.existsSync(envPath)) {
            continue;
        }
        const parsed = parse(fs.readFileSync(envPath, { encoding: options.encoding ?? 'utf8' }));
        for (const key in parsed) {
            const value = parsed[key];
            if (value !== undefined) {
                if (options.override || process.env[key] === undefined) {
                    process.env[key] = value;
                }
                parsedAll[key] = value;
            }
        }
    }
    console.log(`Injected ${Object.keys(parsedAll).length} environment variables. From: ${paths.join(', ')}`);
    return { parsed: parsedAll };
}
