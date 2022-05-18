export const addCoordinates = (cordOnelat, cordOnelng,  cordTwolat, cordTwolng) => {
    return {
        type:'ADD_COORDS',
        payload: {
            cordOnelat,
            cordOnelng,  
            cordTwolat,
            cordTwolng
        }
    }
}
