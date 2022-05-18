let coordinate_pair_id = -1;
export const coordinateReducer = (state=[], action)=> {
    switch(action.type){
        case 'ADD_COORDS':
            coordinate_pair_id++
            return [...state, {
                id: coordinate_pair_id,
                coordinate_one_lat: action.payload.cordOnelat,
                coordinate_one_lng: action.payload.cordOnelng,
                coordinate_two_lat: action.payload.cordTwolat,
                coordinate_two_lng: action.payload.cordTwolng,
            }]
        default:
            return state;
    }
}