"use client"
import { Github } from 'lucide-react';


import Button from "./button"
import { useRouter } from 'next/navigation';

export default function GeotagButton(){
    const router = useRouter()

    const formPage = () => {
        router.push("/form")
    }
    return (
        <div className='flex  flex-col space-y-4 md:w-100 w-60'>  
            <Button title="FAKE GPS" onClick={formPage}/>
            <Button title="REAL GPS" onClick={() => router.push("/camera")}/>
            <Button title="Give a star on Github" onClick={formPage} icons={<Github color="#020e22" strokeWidth={1.75} absoluteStrokeWidth/>}/>
        </div>
    )
}