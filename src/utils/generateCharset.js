export function generateCharset(settings) {
    let _charset = '';

    const entries = Object.entries(settings);
    for (let i = 0; i < entries.length; i++) {
        const [_, { state, charset }] = entries[i];
        if (state) {
            _charset += charset;
        }
    }

    return _charset;
}
