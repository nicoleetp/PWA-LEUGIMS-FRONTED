import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login } from "api/authApi";
import { useAuth } from "hooks/useAuth";
import { isEmailValid, validatePassword } from "helpers/validations";
import { Loading } from "admin/components";

export const LoginPage = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [hasErrors, setHasErrors] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!isEmailValid(newEmail)) {
      setEmailError("Correo electrónico inválido");
      setHasErrors(true);
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const errors = validatePassword(newPassword);
    setPasswordErrors(errors);
    setHasErrors(errors.length > 0 || emailError);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (hasErrors) {
      toast.warn("Por favor, corrige los errores en el formulario.");
      return;
    }

    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-5 p-5">
      {loading ? (
        <Loading />
      ) : (
        <>
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
                  className={`border-2 w-full p-2 rounded-xl outline-none focus-border-gray-400 ${
                    emailError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="leugims@correo.com"
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && (
                  <div className="bg-red-500 rounded-xl p-5 text-white">
                    <ul>
                      <li>&bull; {emailError}</li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="mt-5 flex flex-col gap-2">
                <label htmlFor="" className="text-gray-600 uppercase font-bold">
                  Contraseña
                </label>
                <input
                  type="password"
                  className={`border-2 w-full p-2 rounded-xl outline-none focus-border-gray-400 ${
                    passwordErrors.length > 0
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="*************"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordErrors.length > 0 && hasErrors && (
                  <div className="bg-red-500 rounded-xl p-5 text-white">
                    <ul>
                      {passwordErrors.map((error, index) => (
                        <li key={index}>&bull; {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <input
                type="submit"
                value="Ingresar"
                className="mt-5 w-full py-3 bg-indigo-600 text-gray-100 rounded-xl uppercase font-medium hover:cursor-pointer hover-bg-indigo-700 transition-colors duration-500 ease-in-out"
              />
            </form>
          </div>
        </>
      )}
    </div>
  );
};
