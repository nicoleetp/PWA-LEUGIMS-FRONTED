import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login } from "api/authApi";
import { useAuth } from "hooks/useAuth";

export const LoginPage = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isEmailValid = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const isPasswordValid =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!_%*?&])[A-Za-z\d@$!_%*?&]{6,}$/;

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!isEmailValid.test(newEmail)) {
      setEmailError("Correo electrónico inválido");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const passwordErrors = [];

    if (newPassword.length < 6) {
      passwordErrors.push("La contraseña debe tener al menos 6 caracteres.");
    }

    if (!/[A-Z]/.test(newPassword)) {
      passwordErrors.push(
        "La contraseña debe contener al menos una letra mayúscula."
      );
    }

    if (!/\d/.test(newPassword)) {
      passwordErrors.push("La contraseña debe contener al menos un número.");
    }

    if (!/[@$!_%*?&]/.test(newPassword)) {
      passwordErrors.push(
        "La contraseña debe contener al menos un carácter especial (@$!_%*?&)."
      );
    }

    setPasswordError(passwordErrors.join("\n"));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isEmailValid.test(email) || !isPasswordValid.test(password)) {
      toast.warn("Por favor, corrige los errores en el formulario.");
      return;
    }

    try {
      const user = await login(email, password);

      if (user) {
        const token = user.token;
        localStorage.setItem("token_sesion", token);
        signIn(token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.warn(error?.response?.data?.error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-5 p-5">
      <h1 className="font-extrabold text-4xl text-gray-700 text-center">
        Bienvenido a <span className="text-indigo-600">Leugims</span>
      </h1>

      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/2 xl:w-1/3 bg-white shadow-lg p-10 rounded-lg">
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-gray-600 uppercase font-bold">
              Correo Electrónico
            </label>
            <input
              type="text"
              className={`border-2 w-full p-2 rounded-xl outline-none focus:border-gray-400 ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="leugims@correo.com"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <span className="text-red-500">{emailError}</span>}
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <label htmlFor="" className="text-gray-600 uppercase font-bold">
              Contraseña
            </label>
            <input
              type="password"
              className={`border-2 w-full p-2 rounded-xl outline-none focus:border-gray-400 ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="*************"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <span className="text-red-500">
                {passwordError.split("\n").map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </span>
            )}
          </div>

          <input
            type="submit"
            value="Ingresar"
            className="mt-5 w-full py-3 bg-indigo-600 text-gray-100 rounded-xl uppercase font-medium hover:cursor-pointer hover:bg-indigo-700 transition-colors duration-500 ease-in-out"
          />
        </form>
      </div>
    </div>
  );
};
