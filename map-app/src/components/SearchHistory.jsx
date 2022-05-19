import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { changeAddress } from '../ducks/address/addressAction'

const SearchHistory = () => {
    const allAdressData = useSelector(state => state)
    const dispatch = useDispatch();

    return ( 
        <div className="searchHistory">
        {allAdressData.adressess.map(route =>{
            return(
                <li key={route.id}> 
                        {route.address_one} do {route.address_two}
            
                </li>
            )
        })}
        </div>
     );
}
 
export default SearchHistory;