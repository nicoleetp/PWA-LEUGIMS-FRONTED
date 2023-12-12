const getGreeting = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return "🌞 Buenos días";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "🌞 Buenas tardes";
    } else {
        return "🌜 Buenas noches";
    }
};

function isEmailValid(email) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
}

function isPasswordValid(password) {
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!_%*?&])[A-Za-z\d@$!_%*?&]{6,}$/;
    return passwordRegex.test(password);
}

function validatePassword(password) {
    const errors = [];

    if (password.length < 6) {
        errors.push("La contraseña debe tener al menos 6 caracteres.");
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("La contraseña debe contener al menos una letra mayúscula.");
    }

    if (!/\d/.test(password)) {
        errors.push("La contraseña debe contener al menos un número.");
    }

    if (!/[@$!_%*?&]/.test(password)) {
        errors.push(
            "La contraseña debe contener al menos un carácter especial (@$!_%*?&)."
        );
    }

    return errors;
}

const validateName = (name, text = "") => {
    if (!name.trim()) {
        return `El campo ${text} es obligatorio.`;
    } else if (!/^[\p{L}\s]{1,50}$/u.test(name)) {
        return `El campo ${text} debe contener solo letras y tener un máximo de 50 caracteres.`;
    }
    return null;
};


const validateDNI = (dni) => {
    if (!dni.trim()) {
        return "El DNI es obligatorio.";
    } else if (!/^\d{1,8}$/.test(dni)) {
        return "El DNI debe contener solo números y tener un máximo de 8 caracteres.";
    }
    return null;
};

const isNumeric = (value, title = "") => {
    if (!value.trim()) {
        return null;
    } else if (/^\d+$/.test(value)) {
        return null;
    }
    return `El campo ${title} solo permite numéricos.`;
};

const isAlphabetic = (value, title = "") => {
    if (!value.trim()) {
        return null;
    } else if (/^[A-Za-z]+$/.test(value)) {
        return null;
    }
    return `El campo ${title} solo permite letras.`;
};

const isNumericRequired = (value, title = "") => {
    if (!value.trim()) {
        return `El campo ${title} es obligatorio.`;
    } else if (!/^\d+(\.\d+)?$/.test(value)) {
        return `El campo ${title} solo permite números enteros o decimales.`;
    }
    return null;
};

const isAlphabeticRequired = (value, title = "") => {
    if (!value.trim()) {
        return `El campo ${title} es obligatorio.`;
    } else if (/^[A-Za-z]+$/.test(value)) {
        return `El campo ${title} solo permite letras.`;
    }
    return null;
};

const validateImage = (file, text = "") => {
    if (!file) {
        return `El campo ${text} es obligatorio.`;
    } else if (!file.type.startsWith('image/')) {
        return `Por favor, seleccione una imagen válida.`;
    }
    return null;
};

const validateSelect = (value, title = "") => {
    if (!value.trim()) {
        return `El campo ${title} es obligatorio.`;
    }
    return null;
};

export {
    getGreeting,
    isEmailValid,
    isPasswordValid,
    validatePassword,
    validateName,
    validateDNI,
    isNumeric,
    isAlphabetic,
    isNumericRequired,
    isAlphabeticRequired,
    validateImage,
    validateSelect
};
