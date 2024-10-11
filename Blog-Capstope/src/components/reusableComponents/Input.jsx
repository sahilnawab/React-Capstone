import React,{useId} from 'react'

const Input = React.forwardRef(function Input({ type="text", placeholder, className ,...props},reference) 
    {
        const id=useId();

    return (
        <div className='w-full'>
        <input
        type={type}
        placeholder={placeholder}
        className={` ${className}`}
        ref={reference}
        id={id}
        {...props}
                />
        </div>
        );
    }
);


export default Input;
