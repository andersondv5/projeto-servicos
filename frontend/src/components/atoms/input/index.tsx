import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const Input = <T extends FieldValues>({
  register,
  name,
  type = "text",
  placeholder = "",
  className = "",
  disabled = false
}: InputProps<T>) => {
  const baseClasses = "bg-(--second-color) text-gray-500 w-full p-3 mb-2 rounded-lg focus:outline-none focus:bg-(--third-color) text-sm";
  
  return (
    <input
      {...register(name)}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={`${baseClasses} ${className}`}
    />
  );
};

export default Input;