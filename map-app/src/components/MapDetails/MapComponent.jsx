import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useNavigate } from 'react-router-dom'
import '../../App.css'
import axios from 'axios';
import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux'
import RoutingMachine from "./RoutingMachine";
import { useDispatch } from 'react-redux'
import KilometerInput from '../KilometerInput';
import TravelStats from '../TravelStats';
import '../../App.scss'

const MapComponent = () => {
    const allAdressPairs = useSelector(state => state)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const API_KEY = 'YIwoh8OOrzqznce9J6-TA-NVmccFNhaHlP-5eZe9bFo'
    const [hasComponentLoaded, setHasComponentLoaded] = useState(false);
    const [routeLength, setRouteLength] = useState();
    const [displayRoad, setDisplayRoad] = useState(false);
    const [firstCoordinate, setFirstCoordinate] = useState();
    const [secondCoordinate, setSecondCoordinate] = useState();
    const [averageCoordinates, setAverageCoordinates] = useState();
    const [fuelPrice, setFuelPrice] = useState(0);

    
    useEffect(() => {
        if(allAdressPairs){
            if(allAdressPairs.adressess.length>0){
                (async () => {
                    await axios.get(`https://geocode.search.hereapi.com/v1/geocode`, {
                    params: {
                        apiKey: API_KEY,
                        q: allAdressPairs.adressess[0].address_one
                    }})
                    .then((response) => {
                        setFirstCoordinate(response.data.items[0].position)
                        
                    }).then(async()=>{
                        await axios.get(`https://geocode.search.hereapi.com/v1/geocode`, {
                        params: {
                            apiKey: API_KEY,
                            q: allAdressPairs.adressess[0].address_two
                        }
                    })
                    .then((response) => {
                        setSecondCoordinate(response.data.items[0].position)
                    })
                })
            })()
            }else{
                navigate('/map-app')
            }
        }
    }, [allAdressPairs]);

    // useEffect(() => {(async () => {
    //     if(allAdressPairs.adressess){
            
    //     }
    // })()}, [allAdressPairs]);

    useEffect(() => {(async () => {
        if (firstCoordinate && secondCoordinate) { 
            await axios.get(`https://router.hereapi.com/v8/routes`, {
                params: {
                    apiKey: API_KEY,
                    transportMode:'car',
                    origin: `${firstCoordinate.lat},${firstCoordinate.lng}`  ,
                    destination: `${secondCoordinate.lat},${secondCoordinate.lng}`,
                    return: "summary"
                }
            })
            .then((response) => {
                if(!("notices" in response.data)){
                    setRouteLength(response.data.routes[0].sections[0].summary.length)
                    setDisplayRoad(true)
                }
            })

            setAverageCoordinates({
                "lat": ((firstCoordinate.lat + secondCoordinate.lat) / 2).toFixed(3),
                "lng": ((firstCoordinate.lng + secondCoordinate.lng) / 2).toFixed(3)
            })

            setHasComponentLoaded(true)  
        }  
    })()}, [secondCoordinate, firstCoordinate]);
    
    
const downloadPdfDocument = (rootElementId) => {
    const input = document.getElementById(rootElementId);
    html2canvas(input)
      .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'JPEG', 0, 0);
          pdf.save("download.pdf");
      })
  }
    /* {console.log(document.querySelector(".leaflet-right > .leaflet-control > .leaflet-routing-alternatives-container > .leaflet-routing-alt > h3").textContent)} */

    if(!hasComponentLoaded) return <>
        Loading data...
    </>
    return (
        <div id="MapComponent" >
            {
                (firstCoordinate && secondCoordinate && averageCoordinates ) ?
                    <div className="mapComponent">
                        <div className="travelStats">
                        <TravelStats fuelPrice={fuelPrice} roadLength={routeLength} displayRoad={displayRoad} />
                        <button onClick={() => {navigate('/map-app')}}>Try searching another road</button>
                        </div>
                        <MapContainer center={[averageCoordinates.lat, averageCoordinates.lng]} zoom={13} scrollWheelZoom={false} >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[firstCoordinate.lat, firstCoordinate.lng]}>
                                <Popup>
                                    Początek trasy
                                </Popup>
                            </Marker>
                        
                            <Marker position={[secondCoordinate.lat, secondCoordinate.lng]}>
                                <Popup>
                                    Koniec trasy
                                </Popup>
                                {displayRoad ? <RoutingMachine first={firstCoordinate} second={secondCoordinate} />:<></>}
                                
                            </Marker>
                        </MapContainer>

                        <div className="options">
                        <KilometerInput callback={setFuelPrice} />
                        <button onClick={()=>{downloadPdfDocument("MapComponent")}}>Download pdf</button>
                        </div>
                    </div>
                    :
                    <>
                        <>Loading...</>

                    </>
            }
        </div>
    );
}

export default MapComponent;