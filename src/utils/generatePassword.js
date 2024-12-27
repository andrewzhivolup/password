export const generatePassword = (charset, passwordLength) => {
    const charsetLength = charset.length;
    let password = '';
    const randomValues = new Uint32Array(passwordLength);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < passwordLength; i++) {
        password += charset.charAt(randomValues[i] % charsetLength);
    }

    return password;
};
