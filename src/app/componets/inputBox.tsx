import React from "react"

interface InputTypes {
    placeholder : string
    ref ?: React.Ref<HTMLInputElement>
    type : string
}

export default function Input({ placeholder, ref, type} : InputTypes){
    return (
        <div>
            <label htmlFor="">{placeholder}</label>
            <input type={type} placeholder={placeholder} ref={ref} className="px-4 py-2 outline-none hover:shadow-md shadow-blue-400 transition duration-150 w-full  bg-white rounded-md" required />
        </div>
    )
}