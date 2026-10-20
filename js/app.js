// js/app.js
import { OneTimePad } from "./algorithms/oneTimePad.js";
import { InterruptedTransposition } from "./algorithms/transposition.js";

const messageInput = document.getElementById('encryption-text');
const keyInput = document.getElementById('encryption-key');
const encryptedOutput = document.getElementById('encrypted-text');
const algorithmInput = document.getElementById('encryption-algorithm');

const ciphers = {
    oneTimePad: new OneTimePad(),
    transposition: new InterruptedTransposition()
};
let cipher = ciphers.oneTimePad;

function selectCipher() {
    switch (algorithmInput.value) {
        case 'oneTimePad':
            cipher = ciphers.oneTimePad;
            return;
        case 'transposition':
            cipher = ciphers.transposition;
            return;
        default:
            throw new Error('Por ahora no está implementado el algoritmo. Intente con otro');
    }
}

document.getElementById('clear-btn').addEventListener('click', () => {
    messageInput.value = '';
    keyInput.value = '';
    encryptedOutput.value = '';
});

document.getElementById('encrypt-btn').addEventListener('click', () => {
    try {
        selectCipher();
        const message = messageInput.value;
        const keyBytes = keyInput.value;
        const cipherBytes = cipher.encrypt(message, keyBytes);

        if(cipherBytes instanceof Uint8Array) {
            encryptedOutput.value = Array.from(cipherBytes).map(n => n.toString(16).padStart(2, '0')).join('');
        } else {
            encryptedOutput.value = cipherBytes;
        }
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById('decrypt-btn').addEventListener('click', () => {
    try {
        selectCipher();
        const cipherBytes = encryptedOutput.value;
        const keyBytes = keyInput.value;
        const decryptedMessage = cipher.decrypt(cipherBytes, keyBytes);

        if(decryptedMessage instanceof Uint8Array) {
            messageInput.value = new TextDecoder().decode(decryptedMessage);
        } else {
            messageInput.value = decryptedMessage;
        }
    } catch (error) {
        alert(`No se pudo desencriptar: ${error.message}`);
    }
});

document.getElementById('clear-btn').addEventListener('click', () => {
    messageInput.value = '';
    keyInput.value = '';
    encryptedOutput.value = '';
});