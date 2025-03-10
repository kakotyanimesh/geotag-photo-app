"use client"
import { useEffect, useRef, useState } from "react";
import { SwitchCamera } from 'lucide-react';
import { Camera } from 'lucide-react';





export default function CameraFile(){
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [cameraAngle, setcameraAngle] = useState<"user" | "environment">("environment")
    const [deviceId, setDeviceId] = useState<string>("")
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [loadedFont, setLoadedFont] = useState(false)


    useEffect(() => {
      const fontFace = new FontFace('customFont', 'url(/fonts/Geoform.otf)')

      fontFace.load().then((loadedFont) => {
        document.fonts.add(loadedFont)
        setLoadedFont(true)
      })
      .catch((err) => console.log(`err while loading font ${err}`))
    }, [])
    

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
        width: { ideal: 1280 },
        height: { ideal: 680 },
        deviceId : deviceId
      }, 
      audio : false})
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

        if(!ctx){return}

        if(!videoStream || !canvas){return}
        canvas.width = videoStream.videoWidth;
        canvas.height = videoStream.videoHeight;

        ctx?.drawImage(videoStream, 0, 0, canvas.width, canvas.height)

        if(loadedFont){

            
            // ctx.textAlign = "center"
            /**
             * writing text virtically isnot possible so first we have to rotate the canvas and then write on it then again we have to restore it 
             * blog on => https://newspaint.wordpress.com/2014/05/22/writing-rotated-text-on-a-javascript-canvas/
             */
            ctx.save()
            ctx.translate(10, canvas.height / 2)
            ctx.rotate(Math.PI / 2)
            ctx.font = "48px 'customFont'"
            ctx.textAlign = "center"
            // ctx.textBaseline = "middle"
            ctx.fillText("animesh", 10, 0)
            ctx.restore()
        } else {
            ctx.font = "48px Arial"
            ctx.fillText("gps" , 40, 40)
        }
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
            <div className="flex text-center justify-center gap-10 absolute bottom-30 w-full">
                {/* <Button icons={<Camera color="#196ebe" />} onClick={() => alert("Adad")}/> */}
                <button onClick={clickPhoto}><Camera color="#196ebe" size={54} /></button>
                <button><SwitchCamera size={54} color="#196ebe" onClick={changeCameraAngle}/></button>
            </div>
            <div>
                <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
        </div>
    )
}