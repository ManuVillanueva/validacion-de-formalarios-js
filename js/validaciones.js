// Recibe el input y verifica cual es el input con el dataset
export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    // console.log(input.parentElement);

    // Condicion para verificar si el validty del input es valido y de lo contrario mostrar el mensaje de error del input
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
};

// array que contiene los objetos de los inputs
const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

// Obejeto que contiene los mensajes de error de los respectivos inputs
const mensajesDeError = {
    name: {
        valueMissing: "El campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    }, 
    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener una letra mayúscula, una letra minúscula, un número y no puede contener caracteres especiales."
    },
    birth: {
        valueMissing: "El campo fecha de nacimiento no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad",
    },
    number: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números."
    },
    address: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres"
    },
    city: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 4 a 30 caracteres"
    },
    state: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El estado debe contener entre 4 a 30 caracteres"
    }
};

// Con esto armamos un objeto con cada tipo de input que tengamos
const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";

    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje;
}

//Función para recibir el valor del input
function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad minimo";
    }

    input.setCustomValidity(mensaje);
};

//Función para comparar la fecha que ingresa el usuario y la fecha actual, para así saber si es mayor de edad.
function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18, 
    fecha.getUTCMonth(), 
    fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;
};