export function generateKey(length) {
    const key = new Uint8Array(length);
    window.crypto.getRandomValues(key);
    return key;
}

export function encrypt(text, keyBytes) {
    const textBytes = new TextEncoder().encode(text);

    if (textBytes.length !== keyBytes.length) {
        throw new Error('La clave debe tener el mismo tamaño que el texto en bytes.');
    }

    const cipherBytes = new Uint8Array(textBytes.length);

    for (let i = 0; i < textBytes.length; i++) {
        cipherBytes[i] = textBytes[i] ^ keyBytes[i];
    }
    return cipherBytes;
}

export function decrypt(cipherBytes, keyBytes) {
    if (cipherBytes.length !== keyBytes.length) {
        throw new Error('La clave no corresponde al texto cifrado.');
    }

    const textBytes = new Uint8Array(cipherBytes.length);
    for (let i = 0; i < cipherBytes.length; i++) {
        textBytes[i] = cipherBytes[i] ^ keyBytes[i];
    }

    return textBytes;
}