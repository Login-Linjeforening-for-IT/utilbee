export interface LoadOptions {
    path?: string;
    encoding?: BufferEncoding;
    override?: boolean;
}
export default function load(options?: LoadOptions): {
    parsed: Record<string, string | undefined>;
    error?: undefined;
} | {
    error: unknown;
    parsed?: undefined;
};
