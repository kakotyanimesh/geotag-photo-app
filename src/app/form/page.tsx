"use client"
import { useRouter } from "next/navigation";
import Button from "../componets/button";
import Input from "../componets/inputBox";
import { MapPinMinusInside } from 'lucide-react';
import { useRef } from "react";


export default function FormPage(){

    const router = useRouter()
    const stateRef = useRef<HTMLInputElement>(null)
    const districtRef = useRef<HTMLInputElement>(null)
    const countryRef = useRef<HTMLInputElement>(null)
    const lattitudeRef = useRef<HTMLInputElement>(null)
    const longitudeRef = useRef<HTMLInputElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)
    const timeRef = useRef<HTMLInputElement>(null)
    const goForPhoto = () => {

        if(!districtRef.current?.value || !countryRef.current?.value || !stateRef.current?.value){
            alert("input boxes are empty")
            return
        }

        const date = new Date()
        localStorage.setItem("district", districtRef.current.value)
        localStorage.setItem("state", stateRef.current.value)
        localStorage.setItem("country", countryRef.current.value)
        localStorage.setItem("latitude", lattitudeRef.current?.value ? lattitudeRef.current.value : "26.690666")
        localStorage.setItem("longitude", longitudeRef.current?.value ? longitudeRef.current.value : "92.800959")
        localStorage.setItem("date", dateRef.current?.value ? dateRef.current.value : date.toDateString())
        localStorage.setItem("time", timeRef.current?.value ? timeRef.current.value : "08:53 AM GMT+05:30")
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
                    <Input type="text" placeholder="state" ref={stateRef} />
                    <Input type="text" placeholder="district" ref={districtRef} />
                    <Input type="text" placeholder="Country" ref={countryRef} />
                    <Input type="number" placeholder="Latitude" ref={lattitudeRef} />
                    <Input type="number" placeholder="Longitude" ref={longitudeRef} />
                    <Input type="date" placeholder="Date" ref={dateRef}/>
                    <Input type="time" placeholder="Time" ref={timeRef} />
                </div>
                <Button title="Go for Photo" onClick={goForPhoto}/>
            </div>

        </div>
    )
}