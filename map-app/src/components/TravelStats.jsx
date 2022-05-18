
const TravelStats = ({fuelPrice}) => {

    return ( 
        <div className="travelStats">
            <h1>Stats</h1>
            <p>Road Length: </p>
            <p>Travel Time: </p>
            <p>Fuel Price: {fuelPrice.price} </p>
        </div>
     );
}
 
export default TravelStats;