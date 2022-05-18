let address_pair_id = -1;
export const addressReducer = (state=[], action)=> {
    switch(action.type){
        case 'ADD_ADDRESS':
            address_pair_id++
            return [...state, {
                id: address_pair_id,
                address_one: action.payload.AddressOne,
                address_two: action.payload.AddressTwo,
                isActive: true
            }]
        case 'CHANGE_ADDRESS':
            return state.map(address => {
                if(address.id === action.payload.id){
                    return {...address.id, isActive: true}
                }else return {...address.id, isActive: false}
            })
        default:
            return state;
    }
}