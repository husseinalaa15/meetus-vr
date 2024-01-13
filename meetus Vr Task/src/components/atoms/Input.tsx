import React from "react";

type IProps = {
  type: string;
  name: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error: string | undefined;
  placeholder?:string 
};
const InputForm: React.FC<IProps> = ({
  handleChange,
  handleBlur,
  type,
  name,
  value,
  error,
  placeholder
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        placeholder={placeholder}
      />
      <span className="input-error">{error}</span>
    </>
  );
};

export default InputForm;
