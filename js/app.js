// js/app.js
import { generateKey, encrypt, decrypt } from './algorithms/oneTimePad.js';

const messageInput = document.getElementById('encryption-text');
const keyInput = document.getElementById('encryption-key');
const encryptedOutput = document.getElementById('encrypted-text');
const algorithmInput = document.getElementById('encryption-algorithm');

function ensureOneTimePad() {
    if (algorithmInput.value !== 'oneTimePad') {
        throw new Error('Por ahora solo está implementado el algoritmo One-Time Pad.');
    }
}

function hexaToNumber(hexa) {
    if(hexa.length % 2 !== 0) {
        throw new Error('El texto cifrado debe tener un número par de caracteres hexadecimales.');
    }

    const bytes = new Uint8Array(hexa.length / 2);
    for (let i = 0; i < hexa.length; i += 2) {
        const hexPair = hexa.substr(i, 2);
        bytes[i / 2] = Number.parseInt(hexPair, 16);
    }

    return bytes;
}

document.getElementById('encrypt-btn').addEventListener('click', () => {
    try {
        ensureOneTimePad();
        const message = messageInput.value;
        const messageBytes = new TextEncoder().encode(message);
        let keyBytes;
        if(keyInput.value.trim() === '') {
            keyBytes = generateKey(messageBytes.length);
        } else {
            keyBytes = new TextEncoder().encode(keyInput.value.trim());
        }
        const cipherBytes = encrypt(message, keyBytes);

        keyInput.value = Array.from(keyBytes).map(n => String.fromCodePoint(n)).join('');
        encryptedOutput.value = Array.from(cipherBytes).map(n => n.toString(16).padStart(2, '0')).join('');
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById('decrypt-btn').addEventListener('click', () => {
    try {
        ensureOneTimePad();
        const cipherBytes = hexaToNumber(encryptedOutput.value.trim());
        const keyBytes = new TextEncoder().encode(keyInput.value.trim());
        const decryptedMessage = decrypt(cipherBytes, keyBytes);

        messageInput.value = Array.from(decryptedMessage).map(n => String.fromCodePoint(n)).join('');
    } catch (error) {
        alert(`No se pudo desencriptar: ${error.message}`);
    }
});