// js/algorithms/otp.js

export function generateKey(length) {
    const key = new Uint8Array(length);
    window.crypto.getRandomValues(key);
    return key;
}

export function encryptOTP(text, keyBytes) {
    const textBytes = new TextEncoder().encode(text);
    // Validar que la clave tenga el tamaño correcto, etc.
    const cipherBytes = new Uint8Array(textBytes.length);
    for (let i = 0; i < textBytes.length; i++) {
        cipherBytes[i] = textBytes[i] ^ keyBytes[i];
    }
    return cipherBytes; // O convertir a Hex para exportar
}

export function decryptOTP(cipherBytes, keyBytes) {
    const textBytes = new Uint8Array(cipherBytes.length);
    for (let i = 0; i < cipherBytes.length; i++) {
        textBytes[i] = cipherBytes[i] ^ keyBytes[i];
    }
    return new TextDecoder().decode(textBytes);
}