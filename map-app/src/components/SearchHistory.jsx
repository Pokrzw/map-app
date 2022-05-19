import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { changeAddress } from '../ducks/address/addressAction'
import '../App.scss'

const SearchHistory = () => {
    const allAdressData = useSelector(state => state)
    const dispatch = useDispatch();

    return ( 
        <div className="searchHistory">
            <h4>Search history:</h4>
        {allAdressData.adressess.map(route =>{
            return(
                <li key={route.id}> 
                        {route.address_one} => {route.address_two}
            
                </li>
            )
        })}
        </div>
     );
}
 
export default SearchHistory;