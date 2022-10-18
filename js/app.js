// importo la funcion valida del archivo validaciones
import { valida } from "./validaciones.js";

// Selecciono todos los inputs que tengo en el html
const inputs = document.querySelectorAll("input");

// Agrega a cada input recibido como array la funcion addEventListener() y cuando salga del blur llama a la funcion valida
inputs.forEach( input => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});