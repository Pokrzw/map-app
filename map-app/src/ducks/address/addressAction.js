export const addAddress = (AddressOne,  AddressTwo) => {
    return {
        type:'ADD_ADDRESS',
        payload: {
            AddressOne,  
            AddressTwo
        }
    }
}

export const changeAddress = (id) => {
    return {
        type:'CHANGE_ADDRESS',
        payload: {
            id
        }
    }
}
