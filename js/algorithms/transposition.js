function transformKey(key) {
  const letters = key.toUpperCase().split("");

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

export function encrypt(text, key) {
    const keyNumber = transformKey(key);

    // Eliminar espacios y normalizar el texto
    const textChars = text.toUpperCase().split("");

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