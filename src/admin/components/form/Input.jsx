import React from "react";

export const Input = ({ label, type, placeholder, value, change, name }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium uppercase">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border border-gray-700 p-2 rounded-lg"
        value={value}
        name={name}
        onChange={change}
      />
    </div>
  );
};
