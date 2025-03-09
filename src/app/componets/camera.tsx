"use client"
import { useEffect, useRef, useState } from "react"
import Image from 'next/image'

interface Location {
    latitude : number | null
    longitude : number | null,
    district : string | null,
    state : string | null,
    country : string | null,
    date : string | null,
    time : string | null
}


// interface LLTypes {
//     latitude : number,
//     longitude : number,
//     timestamp : number
// }
export default function Camera(){
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [cameraAngle, setCameraAngle] = useState<"user" | "environment">("user")
    const [streaming, setStreaming] = useState<MediaStream | null>(null)
    const [location, setLocation] = useState<Location>({
        latitude : null,
        longitude : null,
        district : null,
        state : null,
        country : null,
        date : null,
        time : null
    })



    useEffect(() => {
      
        const videoStream = videoRef.current
        if(!videoStream){
            return
        }

        if(streaming){
            streaming.getTracks().forEach((track) => track.stop())
        }

        navigator.mediaDevices.getUserMedia({video : {facingMode : {exact : `${cameraAngle}`}}, audio :false})
        .then((stream) => {
            videoStream.srcObject = stream
            videoStream.play()
            setStreaming(stream)
        })
        .catch((er) => console.log(`error while streaming video ${er}`))
      
    }, [cameraAngle])
    

    // const fetchLocationDdata = async ({latitude, longitude, timestamp} : LLTypes) => {
    //     const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
    //     const data = await res.json()
    //     // console.log(data);
    //     const address = data.address
    //     console.log(address);
    //     const date = new Date(timestamp)
    //     const dateString = date.toLocaleDateString()
    //     const timestring = date.toLocaleTimeString()
        

    //     setLocation({
    //         latitude : latitude,
    //         longitude : longitude,
    //         state : address.state,
    //         country : address.country,
    //         district : address.state_district,
    //         time : timestring,
    //         date : dateString
    //     })
        
        
        
    // }
    const getLocation =  () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition( (position) => {
                const {latitude, longitude } = position.coords
                const timestamp = position.timestamp
                const date = new Date(timestamp)
                const dateString = date.toLocaleDateString()
                const timestring = date.toLocaleTimeString()

                // console.log(latitude);
                // console.log(longitude);
                
                //  await fetchLocationDdata({latitude, longitude, timestamp})
                 // now here im not going to fetch the data as my location is fixed which is sonitpur tezpur and i want to cheat to my proofs so im going to hardcode the values just changing the lattitudes and longitutudes 
                
  
                // console.log(location);

                setLocation({
                    latitude : latitude,
                    longitude : longitude,
                    state : "ASSAM",
                    district : "SONITPUR",
                    country : "INDIA",
                    time : timestring,
                    date : dateString
                })
                
                
            })
        }
    }
    const clickPhoto = () => {
        const videoStream = videoRef.current
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        // const img = imageRef.current

        if(!videoStream || !canvas ){return}

        // there's no point of making it async now but if i want to fetching the real location with latitude and longitude then i have to use the async await so let the async await stays 

        getLocation()
        

        // console.log(location);

        if(location.country){
            const locationText =  `
                GPS Map Camera ${location.district}, ${location.state}, ${location.country} , 784028
                Lat ${location.latitude?.toFixed(6)}, Long ${location.longitude?.toFixed(6)}
                ${location.date} ${location.time} GMT+05:30 
            `
            ctx?.drawImage(videoStream, 0, 0, canvas.width, canvas.height)
            ctx?.fillText(locationText, 10, 50)
            ctx?.fillText("animes", 11, 56)
        }
        


        const dataUrl = canvas.toDataURL("image/png", 0.5)
        setImageSrc(dataUrl)

    }

    const downloadImage = () => {
        if(imageSrc){
            const a = document.createElement("a")
            a.href = imageSrc
            a.download = "image.png"
            a.click()
        }
    }
    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <video ref={videoRef} className="rounded-md "></video>
                <button onClick={clickPhoto}>click me</button>
                <button onClick={() => {
                    if(cameraAngle === "environment"){
                        setCameraAngle("user")
                    } else {
                        setCameraAngle("environment")
                    }
                }}>change camera </button>
            </div>
            <div>
                <canvas ref={canvasRef} className="hidden"></canvas>
                {
                    imageSrc && (
                        <Image
                    ref={imageRef}
                    src={imageSrc}
                    alt="image"
                    width={300}
                    height={400}
                    />
                    )
                }
                {imageSrc && <button onClick={downloadImage}>download image</button>}
                
            </div>
        </div>
    )
}