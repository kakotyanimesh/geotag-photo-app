import React, { ReactNode } from "react"

interface ButonProps {
    title : string,
    onClick : (evenet : React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    icons ?: ReactNode
}

export default function Button({title, onClick, icons} : ButonProps){
    return (
        <button onClick={onClick} className="bg-blue-600 w-full rounded-md py-2 flex flex-row justify-center items-center">
            {icons}
            {title} 
        </button>
    )
}