// algorithms/transposition.js

import { Cipher } from "../cipher.js";

export class InterruptedTransposition extends Cipher {
    encrypt(text, key) {
        const keyNumber = transformKey(key);
        const textChars = text.toUpperCase().replaceAll(/\s+/g, "").split("");
        const columns = keyNumber.length;
        const matrix = [];

        let pos = 0;
        let rowIndex = 0;

        // Construir filas de longitudes variables
        while (pos < textChars.length) {
            const rowNumber = (rowIndex % columns) + 1;

            // Posición de la columna que tiene este número
            const rowLength = keyNumber.indexOf(rowNumber) + 1;

            const row = new Array(rowLength).fill(null);

            for (let col = 0; col < rowLength && pos < textChars.length; col++) {
                row[col] = textChars[pos++];
            }

            matrix.push(row);
            rowIndex++;
        }

        // Leer las columnas en orden numérico
        const cipherText = [];

        for (let number = 1; number <= columns; number++) {
            const col = keyNumber.indexOf(number);

            for (const row of matrix) {
                if (col < row.length && row[col] !== null) {
                    cipherText.push(row[col]);
                }
            }
        }

        return cipherText.join("");
    }

    decrypt(cipherText, key) {
        const keyNumber = transformKey(key);
        const columns = keyNumber.length;
        const rowLengths = [];
        let remaining = cipherText.length;
        let rowIndex = 0;

        while (remaining > 0) {
            const rowNumber = (rowIndex % columns) + 1;
            const rowLength = keyNumber.indexOf(rowNumber) + 1;
            const length = Math.min(rowLength, remaining);
            rowLengths.push(length);
            remaining -= length;
            rowIndex++;
        }

        const rows = rowLengths.map(length => new Array(length));
        let position = 0;

        for (let number = 1; number <= columns; number++) {
            const column = keyNumber.indexOf(number);

            for (let row = 0; row < rows.length; row++) {
                if (column < rows[row].length) {
                    rows[row][column] = cipherText[position++];
                }
            }
        }

        return rows.map(row => row.join("")).join("");
    }
}

function transformKey(key) {
  const normalizedKey = String(key).trim();

  if (!normalizedKey) {
    throw new Error("La clave de transposición no puede estar vacía.");
  }

  const letters = normalizedKey.toUpperCase().split("");

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
