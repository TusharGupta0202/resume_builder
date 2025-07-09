import { useState } from 'react';
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa'

const Input = ({type,label,placeholder,value,onChange,autoFocus=false}) => {

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

  return (
    <div>
        <label className='text-[13px] text-slate-800'>{label}</label>
        <div className='input-box'>
            <input 
                autoFocus={autoFocus}
                type={type == "password" ? ( showPassword ? "text" :  "password") : type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e)}
                className={'w-full bg-transparent outline-none'}
            />

            {type === "password" && (
                <>
                    {showPassword ? (
                        <FaRegEye 
                            size={22}
                            className='cursor-pointer text-primary'
                            onClick={() => toggleShowPassword()}
                        />
                    ) : (
                        <FaRegEyeSlash
                            size={22}
                            className='cursor-pointer text-slate-400'
                            onClick={() => toggleShowPassword()}
                        />
                    )}
                </>
            )}
        </div>
    </div>
  )
}

export default Input