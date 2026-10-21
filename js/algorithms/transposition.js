// algorithms/transposition.js

import { Cipher } from "../cipher.js";

export class UninterruptedTransposition extends Cipher {
    encrypt(text, key) {
        const keyNumber = transformKey(key);
        const textChars = normalizeText(text);
        const columns = keyNumber.length;
        const rows = Math.ceil(textChars.length / columns);
        const cipherText = [];

        for (let number = 1; number <= columns; number++) {
            const column = keyNumber.indexOf(number);

            for (let row = 0; row < rows; row++) {
                const index = row * columns + column;

                if (index < textChars.length) {
                    cipherText.push(textChars[index]);
                }
            }
        }

        return cipherText.join("");
    }

    decrypt(cipherText, key) {
        const keyNumber = transformKey(key);
        const cipherChars = normalizeText(cipherText);
        const columns = keyNumber.length;
        const fullRows = Math.floor(cipherChars.length / columns);
        const remainder = cipherChars.length % columns;
        const plainChars = new Array(cipherChars.length);
        let position = 0;

        for (let number = 1; number <= columns; number++) {
            const column = keyNumber.indexOf(number);
            const columnLength = fullRows + (column < remainder ? 1 : 0);

            for (let row = 0; row < columnLength; row++) {
                plainChars[row * columns + column] = cipherChars[position++];
            }
        }

        return plainChars.join("");
    }
}

function normalizeText(text) {
    return Array.from(String(text).toUpperCase().replaceAll(/\s+/g, ""));
}

function transformKey(key) {
  const normalizedKey = String(key).trim();

  if (!normalizedKey) {
    throw new Error("La clave de transposición no puede estar vacía.");
  }

  const letters = Array.from(normalizedKey.toUpperCase());

  const ordenadas = letters
    .map((letter, index) => ({ letter, index }))
    .sort((a, b) =>
      a.letter.localeCompare(b.letter) || a.index - b.index
    );

  const numberKey = new Array(letters.length);

  ordenadas.forEach((item, index) => {
    numberKey[item.index] = index + 1;
  });

  return numberKey;
}
