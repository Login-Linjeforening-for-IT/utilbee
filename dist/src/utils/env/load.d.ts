export interface LoadOptions {
    path?: string | string[];
    encoding?: BufferEncoding;
    override?: boolean;
}
export default function load(options?: LoadOptions): {
    parsed: Record<string, string>;
};
