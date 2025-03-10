
import { Camera} from 'lucide-react';

import GeotagButton from './componets/geoTagbutton';


export default function Home (){
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex  flex-col justify-center items-center text-center space-y-5 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-md ">
        <Camera color="#2b16ca" strokeWidth={1.75} absoluteStrokeWidth />
        <div>
          <h1 className="font-bold text-xl">FAKE GEO TAG PHOTO BOOTH  </h1> 
          <p className='text-sm'>Create photos with custom location metadata and enjoy cheating..</p>
        </div>
        <div>
          <GeotagButton/>
        </div>
        </div>
    </div>
  )
}