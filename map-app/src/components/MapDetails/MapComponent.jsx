import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { BasemapLayer, FeatureLayer } from "react-esri-leaflet";
import { Link, useNavigate } from 'react-router-dom'
import '../../App.css'
import L from "leaflet";
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux'
import RoutingMachine from "./RoutingMachine";
import { useDispatch } from 'react-redux'
import { addCoordinates } from '../../ducks/coordinates/coordinatesAction';
import { useInView } from 'react-hook-inview'
import KilometerInput from '../KilometerInput';
import TravelStats from '../TravelStats';


const MapComponent = () => {
    const allAdressPairs = useSelector(state => state)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const API_KEY = 'YIwoh8OOrzqznce9J6-TA-NVmccFNhaHlP-5eZe9bFo'
    const [hasComponentLoaded, setHasComponentLoaded] = useState(false);
    const [routeLength, setRouteLength] = useState();
    const [travelTime, setTravelTime] = useState();
    const [firstCoordinate, setFirstCoordinate] = useState();
    const [secondCoordinate, setSecondCoordinate] = useState();
    const [averageCoordinates, setAverageCoordinates] = useState();
    const [getFuelPrice, setGetFuelPrice] = useState(0);

    

    useEffect(() => {
        (async () => {
            await axios.get(`https://geocode.search.hereapi.com/v1/geocode`, {
                params: {
                    apiKey: API_KEY,
                    q: allAdressPairs.adressess.at(-1).address_one
                }
            })
                .then((response) => {
                    setFirstCoordinate(response.data.items[0].position)

                })
        })()
        // 
    }, []);

    useEffect(() => {
        (
            async () => {
                await axios.get(`https://geocode.search.hereapi.com/v1/geocode`, {
                    params: {
                        apiKey: API_KEY,
                        q: allAdressPairs.adressess.at(-1).address_two
                    }
                })
                    .then((response) => {
                        setSecondCoordinate(response.data.items[0].position)
                    })
            }
        )()
    }, []);

    useEffect(() => {
        if (firstCoordinate && secondCoordinate) { 
            
            dispatch(addCoordinates(firstCoordinate.lat, firstCoordinate.lng, secondCoordinate.lat, secondCoordinate.lng));
            setAverageCoordinates({
                "lat": ((firstCoordinate.lat + secondCoordinate.lat) / 2).toFixed(3),
                "lng": ((firstCoordinate.lng + secondCoordinate.lng) / 2).toFixed(3)
            })
            setHasComponentLoaded(true)
        }
    }, [secondCoordinate, firstCoordinate]);
 
    useEffect(() => {
        
            // const travelData = document.querySelector(".leaflet-right > .leaflet-control > .leaflet-routing-alternatives-container > .leaflet-routing-alt > h3").textContent.split(',');
            // setRouteLength(travelData[0]);
            // setTravelTime(travelData[1]);  
        
    }, []);
    

    if(!hasComponentLoaded) return <>Jeszcze nie...</>
    return (
        <div className="MapComponent" >
            {
                (firstCoordinate && secondCoordinate && averageCoordinates ) ?
                    <div className="mapComponent">
                        <TravelStats fuelPrice={getFuelPrice}/>
                        <button onClick={() => {navigate('/map-app')}}>Try searching another road</button>
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

                                <RoutingMachine first={firstCoordinate} second={secondCoordinate} />
                            </Marker>
                            
                            {/* {console.log(document.querySelector(".leaflet-right > .leaflet-control > .leaflet-routing-alternatives-container > .leaflet-routing-alt > h3").textContent)} */}
                        </MapContainer>
                        <KilometerInput callback={setGetFuelPrice} />
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