import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../form/Input";
import { registerUser } from "api/userApi";

export const FormUser = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    dni: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(userData);
      toast.success(
        `El usuario ${response.name.toUpperCase()} fue registrado correctamente`
      );
      navigate("/users");
    } catch (error) {
      toast.warn(error?.response?.data?.error);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-3 gap-x-5 gap-y-8">
          <Input
            label={"Nombre"}
            type={"text"}
            placeholder={"Ingrese su nombre"}
            name="name"
            value={userData.name}
            change={handleInputChange}
          />
          <Input
            label={"Apellidos"}
            type={"text"}
            placeholder={"Ingrese sus apellidos"}
            name="lastname"
            value={userData.lastname}
            change={handleInputChange}
          />
          <Input
            label={"DNI"}
            type={"text"}
            placeholder={"78463214"}
            name="dni"
            value={userData.dni}
            change={handleInputChange}
          />
          <Input
            label={"Celular"}
            type={"text"}
            placeholder={"974 744 123"}
            name="phone"
            value={userData.phone}
            change={handleInputChange}
          />
          <Input
            label={"Dirección"}
            type={"text"}
            placeholder={"Ingrese su dirección"}
            name="address"
            value={userData.address}
            change={handleInputChange}
          />
          <Input
            label={"Correo Electrónico"}
            type={"email"}
            placeholder={"user@email.com"}
            name="email"
            value={userData.email}
            change={handleInputChange}
          />
          <Input
            label={"Contraseña"}
            type={"password"}
            placeholder={"****************"}
            name="password"
            value={userData.password}
            change={handleInputChange}
          />
        </div>

        <div className="mt-5 flex items-center gap-5">
          <button
            className="bg-indigo-500 text-white uppercase font-medium py-3 px-10 rounded-lg hover:bg-indigo-600 transition-colors duration-500 ease-out cursor-pointer"
            type="submit"
          >
            Registrar
          </button>
          <Link
            to="/users"
            className="bg-red-500 text-white uppercase font-medium py-3 px-10 rounded-lg hover:bg-red-600 transition-colors duration-500 ease-out cursor-pointer"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </>
  );
};
