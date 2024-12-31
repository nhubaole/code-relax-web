import { useState } from 'react';
import eye_disable from "../../assets/eye-disable.svg";
import eye from "../../assets/eye.svg";

const PasswordInput = ({placeholder = "Password", value, onChange, } 
  : { placeholder?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => { setShowPassword(!showPassword); };

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        className="w-full px-4 py-3 bg-[#FFFFFF] bg-opacity-0 border border-[#FFFFFF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFFFFF] placeholder-[#FFFFFF] text-[#FFFFFF]"
        placeholder={placeholder}
        onChange={onChange} 
        value={value}
        required
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute flex items-center justify-center w-8 h-8 right-2 top-2 focus:outline-none"
      >
        {showPassword ? (
          <img src={eye} alt="Hide" className='w-6 h-6'/> 
        ) : (
          <img src={eye_disable} alt="Show" className='w-6 h-6'/> 
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
