import React, { useId } from 'react'

function Select(
    {options,label,className='',...props},reference) {
    const id=useId();
    return (
        <div className='w-full'> 
       {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>}
       <select
       className={`mt-1 block w-full pl-3 pr-10 py-2 text-base 
        border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent sm:text-sm rounded-md ${className}`}
       ref={reference}
         id={id}
        {...props}
       >
       {options?.map((option)=>(
            <option key={option} value={option} >{option}</option>
       ))}
       </select>
         </div>
    )
  } 

  //exporting the Select component with ref forwarding
export  default React.forwardRef(Select);