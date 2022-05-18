import { useSelector } from 'react-redux'
const SearchHistory = () => {
    const allAdressPairs = useSelector(state => state)
    return ( 
        <div className="searchHistory">
        {/* {console.log(allAdressPairs)} */}
        {allAdressPairs.adressess.map(route =>{
            return(
                <li key={route.id}> {route.address_one} -> {route.address_two}</li>
            )
        })}
        </div>
     );
}
 
export default SearchHistory;