// cipher.js

export class Cipher {
    constructor() {
        if (new.target === Cipher) {
            throw new Error(
                "Cipher es una clase abstracta y no puede instanciarse directamente."
            );
        }
    }

    encrypt(text, key) {
        throw new Error("Debes implementar encrypt().");
    }

    decrypt(cipherText, key) {
        throw new Error("Debes implementar decrypt().");
    }
}