"use client"
import { useRouter } from "next/navigation";
import Button from "../componets/button";
import Input from "../componets/inputBox";
import { MapPinMinusInside } from 'lucide-react';


export default function FormPage(){
    const router = useRouter()
    const goForPhoto = () => {
        router.push("/camera")
    }
    return ( 
        <div className="flex justify-center items-center min-h-screen mx-5 ">
            <div className="space-y-4">
                {/* <h1 className="text-center">Give it to me… ALL of it. Every. Single. Detail. Don’t hold back</h1>  */}
                <div className="flex items-center justify-center">
                    <MapPinMinusInside size={32} color="#020e22" strokeWidth={1.75} absoluteStrokeWidth />
                </div>
                <div className="grid md:grid-cols-2  gap-5">
                    <Input type="text" placeholder="state" />
                    <Input type="text" placeholder="district" />
                    <Input type="text" placeholder="Country" />
                    <Input type="number" placeholder="Latitude" />
                    <Input type="number" placeholder="Longitude" />
                    <Input type="date" placeholder="Date" />
                    <Input type="time" placeholder="Time" />
                </div>
                <Button title="Go for Photo" onClick={goForPhoto}/>
            </div>

        </div>
    )
}