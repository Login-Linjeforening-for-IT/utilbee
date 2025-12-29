const regex = new RegExp(
// Start of line and optional whitespace
'^\\s*' +
    // Optional 'export ' prefix
    '(?:export\\s+)?' +
    // Variable name (group 1)
    '([\\w.-]+)' +
    // Separator "=" or ":" with optional whitespace
    '(?:\\s*=\\s*?|:\\s+?)' +
    // Value (group 2): quoted strings or unquoted until # or end
    '(\\s*\'(?:\\\\\'|[^\'])*\'|\\s*"(?:\\\\"|[^"])*"|\\s*`(?:\\\\`|[^`])*`|[^#\\r\\n]+)?' +
    // Optional whitespace or comment, and end of line
    '\\s*(?:#.*)?$', 'mg');
export default function envParse(src) {
    const object = {};
    const lines = src.toString().replace(/\r\n?/mg, '\n');
    const matches = lines.matchAll(regex);
    for (const match of matches) {
        const key = match[1];
        if (!key)
            continue;
        let value = (match[2] || '').trim();
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, '$2');
        if (value[0] === '"') {
            value = value.replace(/\\n/g, '\n');
            value = value.replace(/\\r/g, '\r');
        }
        object[key] = value === '' ? undefined : value;
    }
    return object;
}
