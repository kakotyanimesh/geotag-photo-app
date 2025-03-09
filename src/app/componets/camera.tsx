"use client"
import { useEffect, useRef, useState } from "react"
import Image from 'next/image'

export default function Camera(){
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [cameraAngle, setCameraAngle] = useState<"user" | "environment">("user")



    useEffect(() => {
      
        const videoStream = videoRef.current
        if(!videoStream){
            return
        }

        navigator.mediaDevices.getUserMedia({video : {facingMode : {exact : `${cameraAngle}`}}, audio :false})
        .then((stream) => {
            videoStream.srcObject = stream
            videoStream.play()
        })
        .catch((er) => console.log(`error while streaming video ${er}`))
      
    }, [])
    
    const clickPhoto = () => {
        const videoStream = videoRef.current
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        // const img = imageRef.current

        if(!videoStream || !canvas ){return}

        ctx?.drawImage(videoStream, 0, 0, canvas?.width, canvas?.height)
        ctx?.fillText("animesh", 40, 40)

        const dataUrl = canvas.toDataURL("image/png", 0.5)
        setImageSrc(dataUrl)

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
                
            </div>
        </div>
    )
}