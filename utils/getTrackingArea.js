async function getTrackingArea(airportInformation) {
    console.log(airportInformation);
    const trackingArea = [];
    const { latitude, longitude } = airportInformation;
    const delta = 0.2;
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const minLat = (lat - delta).toFixed(4);
    const maxLat = (lat + delta).toFixed(4);
    const minLon = (lon - delta).toFixed(4);
    const maxLon = (lon + delta).toFixed(4);

    return {
        minLat,
        maxLat,
        minLon,
        maxLon
    };
}
export default getTrackingArea;