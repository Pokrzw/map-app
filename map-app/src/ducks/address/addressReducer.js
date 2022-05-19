let address_pair_id = -1;
export const addressReducer = (state=[], action)=> {
    switch(action.type){
        case 'ADD_ADDRESS':
            address_pair_id++
            return [ {
                id: address_pair_id,
                address_one: action.payload.AddressOne,
                address_two: action.payload.AddressTwo,
            },...state]
        case 'CHANGE_ADDRESS':
            const newFirst= state.filter((item)=>{
                return item.id===action.payload.id
            })

            const theRest = state.filter((item)=>{
                return item.id!==action.payload.id
            })
            return [...newFirst, ...theRest]
            
        default:
            return state;
    }
}
