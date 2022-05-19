import { useState, useEffect } from "react";
import '../App.scss'
const TravelStats = ({ fuelPrice, roadLength, displayRoad }) => {
    const [travelTime, setTravelTime] = useState();
    const [travelPrice, setTravelPrice] = useState();

    const countTravelPrice = (roadLength, fuelPrice) => {
        // console.log(((roadLength / 1000) * 1.1 * fuelPrice));
        return parseFloat(((roadLength / 1000) * 1.1 * fuelPrice).toFixed(2))
    }

    const countTravelDays = (price, length) => {
        const noOfDaysBasedOnPrice = price / 1000;
        const noOfDaysBasedOnKms = (length / 1000) / 800;
        return Math.max(noOfDaysBasedOnPrice, noOfDaysBasedOnKms);
    }

    useEffect(() => {
        const time = countTravelDays(countTravelPrice(roadLength, fuelPrice), roadLength)
        if(time<1){
            setTravelTime("Less than a day")
        } else {
            setTravelTime(`${time.toFixed(1)} days`)
        }
    }, [fuelPrice]);

    

    return (
        <div className="travelStats2">
            {
                displayRoad ?
                    <>
                        <h1>Stats</h1>
                        <p>Road Length: {(roadLength / 1000).toFixed(0)} km</p>
                        
                        <p>Travel Time: {travelTime ? travelTime : ""}</p>
                        <p>Fuel Price: {countTravelPrice(roadLength, fuelPrice)==0 ? "Not yet set" : countTravelPrice(roadLength, fuelPrice)} </p>
                    </>
                    :
                    <>We couldnt find a road for the path you provided. Our service
                        assumes that an user commutes by car. Unfortunately, our service does not
                        support ships or planes as means of communication</>
            }
        </div>
    );
}

export default TravelStats;