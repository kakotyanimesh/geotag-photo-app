"use client"
import { useEffect, useRef, useState } from "react";
import { SwitchCamera } from 'lucide-react';
import { Camera } from 'lucide-react';
import { GeoLocationType, LocationTypes } from "@/types/types";
import axios from "axios"





export default function CameraFile(){
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [cameraAngle, setcameraAngle] = useState<"user" | "environment">("environment")
    const [deviceId, setDeviceId] = useState<string>("")
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [loadedFont, setLoadedFont] = useState(false)
    const [location, setLocation] = useState<LocationTypes>({
        district : "",
        state : "",
        country : "",
        date : "",
        time : ""
    })
    const [geolocation, setGeolocation] = useState<GeoLocationType>({
        lattitude : null,
        longitude : null
    })


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
      
    }, [cameraAngle])

    

    // const getactualLocation = async () => {

    // }

    const getactualLocation = async () => {
        try {
            if (geolocation.lattitude || geolocation.longitude) {
                const actualLocation = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=${geolocation.lattitude}&lon=${geolocation.longitude}`)
                console.log(actualLocation.data.features[0].properties.geocoding.country);
            }
        } catch (error) {
            console.log(`error while fetching user data ${error}`);
            
        }
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setGeolocation({
                lattitude : position.coords.latitude,
                longitude : position.coords.longitude
            })
        })

    }, [])

    useEffect(() => {
      getactualLocation()
    }, [geolocation])
    
    


    
    const changeCameraAngle = () => {
        if(cameraAngle === "environment"){
            setcameraAngle("user")
        } else if(cameraAngle === "user") {
            setcameraAngle("environment")
        }
    }

    const clickPhoto = async () => {
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
            ctx.translate(130, 700)
            ctx.rotate(Math.PI / 2)
            ctx.font = "25px 'customFont'"
            ctx.textAlign = "center"
            ctx.fillStyle = "white"
            // ctx.textBaseline = "middle"
            const lineHeight = 25
            let currentY = 0
            ctx.fillText("Sonitpur, Assam, India", 10, currentY)
            currentY += lineHeight

            
            // ctx.font = "10px 'customFont'"
            ctx.fillText("Borguri Amolapam Napam Road", 10, currentY)

            currentY += lineHeight
            ctx.fillText("Lat 26.690666, Long 92.800959", 10, currentY)
            currentY += lineHeight
            ctx.fillText("12/03/2025 08:55 AM GMT+05:30", 10, currentY)
            currentY += lineHeight
            ctx.fillText("NOTE : Captured by GPS CAMERA", 10, currentY)
            ctx.restore()
            // c)tx.restore(

            const googleMapIcons = new Image()
            googleMapIcons.src = "/newmap.jpg"

            googleMapIcons.onload = () => {
                const imgX = 20
                const imgY = currentY + 210
                const imgWidth = 150
                const imgHeight = 150

                ctx.drawImage(googleMapIcons, imgX, imgY, imgWidth, imgHeight)

                const url = canvas.toDataURL("image/png", 1)
                setImageSrc(url)
            
                const a = document.createElement("a")
                a.href = url
                a.download = "image.png"
                a.click()  
            }
            
        } else {
            ctx.font = "48px Arial"
            ctx.fillText("gps" , 40, 40)
            const url = canvas.toDataURL("image/png", 1)
        setImageSrc(url)

        if(imageSrc){
            const a = document.createElement("a")
            a.href = url
            a.download = "image.png"
            a.click()
        }
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