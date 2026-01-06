import fs from 'node:fs'
import path from 'node:path'
import parse from './parse.ts'

export interface LoadOptions {
    path?: string | string[]
    encoding?: BufferEncoding
    override?: boolean
}

export default function load(options: LoadOptions = {}) {
    const paths = Array.isArray(options.path) ? options.path : [options.path ?? '.env']
    const parsedAll: Record<string, string> = {}

    for (const file of paths) {
        const envPath = path.resolve(process.cwd(), file)

        if (!fs.existsSync(envPath)) {
            continue
        }

        const parsed = parse(fs.readFileSync(envPath, { encoding: options.encoding ?? 'utf8' }))

        for (const key in parsed) {
            const value = parsed[key]
            if (value !== undefined) {
                if (options.override || process.env[key] === undefined) {
                    process.env[key] = value
                }
                parsedAll[key] = value
            }
        }
    }

    console.log(`Injected ${Object.keys(parsedAll).length} environment variables. From: ${paths.join(', ')}`)
    return { parsed: parsedAll }
}
