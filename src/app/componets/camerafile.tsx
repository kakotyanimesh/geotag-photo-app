"use client"
import { useEffect, useRef, useState } from "react";
import { SwitchCamera } from 'lucide-react';
import { Camera } from 'lucide-react';


export default function CameraFile(){
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [cameraAngle, setcameraAngle] = useState<"user" | "environment">("user")
    const [deviceId, setDeviceId] = useState<string>("")
    const [imageSrc, setImageSrc] = useState<string | null>(null)


    useEffect(() => {
      const video = videoRef.current

      if(!video){return}

      if (video.srcObject) {
        (video.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }

    // get device id for camera positon 

      navigator.mediaDevices.enumerateDevices().then((device) => {
        device.forEach((d) => setDeviceId(d.deviceId))
      }).catch((er) => console.log(`errr while getting device id ${er}`))

      navigator.mediaDevices.getUserMedia({video : {
        facingMode :{ exact : cameraAngle},
        // width: { ideal: 430 },
        // height: { ideal: 340 },
        deviceId : deviceId
      }, audio : false})
      .then((stream) => {
        video.srcObject = stream
        video.play()
      })
      .catch((err) => console.log(`err at video stream ${err}`))
      
    }, [cameraAngle, deviceId])

    const changeCameraAngle = () => {
        if(cameraAngle === "environment"){
            setcameraAngle("user")
        } else if(cameraAngle === "user") {
            setcameraAngle("environment")
        }
    }

    const clickPhoto = () => {
        const videoStream = videoRef.current
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")

        if(!videoStream || !canvas){return}

        ctx?.drawImage(videoStream, 0, 0, 10, 300)
        const url = canvas.toDataURL("image/png", 1)
        setImageSrc(url)

        if(imageSrc){
            const a = document.createElement("a")
            a.href = imageSrc
            a.download = "image.png"
            a.click()
        }
    }

    return (
        <div>
            <div>
                {/* <h1>fake gps </h1> */}
                <video ref={videoRef} className="rounded-md"></video>
            </div>
            <div className="flex flex-row gap-10 justify-center items-center absolute left-1/2 bottom-30 ">
                {/* <Button icons={<Camera color="#196ebe" />} onClick={() => alert("Adad")}/> */}
                <button onClick={clickPhoto}><Camera color="#196ebe" /></button>
                <button><SwitchCamera color="#196ebe" onClick={changeCameraAngle}/></button>
            </div>
            <div>
                <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
        </div>
    )
}