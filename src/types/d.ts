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
    // Added state to track device type
    const [isMobile, setIsMobile] = useState<boolean>(false)

    useEffect(() => {
      // Detect if the device is mobile using userAgent
      const checkIfMobile = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        setIsMobile(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent));
      }
      
      checkIfMobile();
      // Also check screen dimensions as another indicator
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 768);
      }
      
      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
    }, [])

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

      // get device id for camera position 
      navigator.mediaDevices.enumerateDevices().then((device) => {
        device.forEach((d) => setDeviceId(d.deviceId))
      }).catch((er) => console.log(`errr while getting device id ${er}`))

      // Modified to use consistent constraints across devices
      const constraints = {
        video: {
          facingMode: { exact: cameraAngle },
          // Using aspectRatio instead of fixed width/height
          aspectRatio: 16/9,
          deviceId: deviceId ? { exact: deviceId } : undefined
        },
        audio: false
      };

      navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        video.srcObject = stream
        video.play()
      })
      .catch((err) => console.log(`err at video stream ${err}`))
      
    }, [cameraAngle, deviceId])

    const getactualLocation = async () => {
        try {
            if (geolocation.lattitude || geolocation.longitude) {
                const actualLocation = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=${geolocation.lattitude}&lon=${geolocation.longitude}`)
                // console.log(actualLocation.data.features[0].properties.geocoding);
                const data = actualLocation.data.features[0].properties.geocoding
                console.log(data.district);
                
                setLocation({
                    district : data.district,
                    state : data.state,
                    country : data.country,
                    date : new Date().toLocaleDateString(),
                    time : new Date().toLocaleTimeString() 
                })
                // console.log(location);
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

        console.log(location);
        
        if(!ctx || !videoStream || !canvas){return}

        // Key fix: Set canvas size properly based on the video element's display dimensions
        // rather than its intrinsic dimensions which can vary across devices
        const videoWidth = videoStream.videoWidth;
        const videoHeight = videoStream.videoHeight;
        
        // Maintain aspect ratio while ensuring the full image is captured
        const aspectRatio = videoWidth / videoHeight;
        
        // Set canvas dimensions to match video's intrinsic dimensions
        canvas.width = videoWidth;
        canvas.height = videoHeight;
        
        // Clear canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the video frame to the canvas, maintaining proper dimensions
        ctx.drawImage(videoStream, 0, 0, canvas.width, canvas.height);

        if(loadedFont){
            // Text overlay logic
            ctx.save();
            
            // Adjust text position based on canvas dimensions
            // This ensures text appears in the right place regardless of device
            const textPosX = isMobile ? 130 : Math.min(130, canvas.width * 0.1);
            const textPosY = isMobile ? 700 : Math.min(700, canvas.height * 0.9);
            
            ctx.translate(textPosX, textPosY);
            ctx.rotate(Math.PI / 2);
            ctx.font = "25px 'customFont'";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            
            const lineHeight = 25;
            let currentY = 0;
            ctx.fillText(`${location.district} ${location.state} ${location.country}`, 10, currentY);
            currentY += lineHeight;
            
            currentY += lineHeight;
            ctx.fillText(`lat ${geolocation.lattitude}, Long ${geolocation.longitude}`, 10, currentY);
            currentY += lineHeight;
            ctx.fillText(`${location.date} ${location.time} `, 10, currentY);
            currentY += lineHeight;
            ctx.fillText("NOTE : Captured by GPS CAMERA", 10, currentY);
            ctx.restore();

            const googleMapIcons = new Image();
            googleMapIcons.src = "/newmap.jpg";

            googleMapIcons.onload = () => {
                // Calculate map icon position and size relative to canvas dimensions
                const mapWidth = isMobile ? 150 : Math.min(150, canvas.width * 0.15);
                const mapHeight = isMobile ? 150 : Math.min(150, canvas.width * 0.15);
                const mapX = 20;
                const mapY = isMobile ? currentY + 210 : Math.min(currentY + 210, canvas.height * 0.7);
                
                ctx.drawImage(googleMapIcons, mapX, mapY, mapWidth, mapHeight);

                // Generate and download the image
                const url = canvas.toDataURL("image/png", 1);
                setImageSrc(url);
            
                const a = document.createElement("a");
                a.href = url;
                a.download = "image.png";
                a.click();  
            }
            
        } else {
            ctx.font = "48px Arial";
            ctx.fillText("gps" , 40, 40);
            const url = canvas.toDataURL("image/png", 1);
            setImageSrc(url);

            if(imageSrc){
                const a = document.createElement("a");
                a.href = url;
                a.download = "image.png";
                a.click();
            }
        }
    }

    return (
        <div>
            <div>
                {/* <h1>fake gps </h1> */}
                <video ref={videoRef} className="rounded-md" style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }}></video>
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