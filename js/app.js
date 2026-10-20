// js/app.js
//import { generateKey, encryptOTP, decryptOTP } from './algorithms/otp.js';

// Ejemplo rápido de cómo conectarías un botón de cifrado:
document.getElementById('encrypt-btn').addEventListener('click', () => {
    const message = document.getElementById('encryption-text').value;
    //const textBytes = new TextEncoder().encode(message);
    
    alert('Botón de encriptar presionado con mensaje: ' + message);

    // Mostrar resultados en la interfaz...
});