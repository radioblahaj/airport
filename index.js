import airportData from 'airport-data-js';
import { parse } from 'dotenv';

async function fetchAirportData(airportCode) {
    try {
        const airport = await airportData.getAirportByIata(airportCode)
        const data = airport[0];
        const { latitude, longitude, wikipedia_link, flightradar24_url } = data;
        console.log(latitude, longitude, wikipedia_link, flightradar24_url);
        return { latitude, longitude, wikipedia_link, flightradar24_url };

    } catch (error) {
        console.error('Error fetching airport data:', error);
    }
}

const airportCode = 'YYZ'
const airportInformation = await fetchAirportData(airportCode)


async function getTrackingArea(airportInformation) {
    console.log(airportInformation)
    const trackingArea = []
    const { latitude, longitude } = airportInformation;
    const delta = 0.2
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
    }
}

async function getFlightsData(minLat, maxLat, minLon, maxLon) {
    try {
        let data = {
            minLat: minLat,
            maxLat: maxLat,
            minLon: minLon,
            maxLon: maxLon
        }



        const url = `https://opensky-network.org/api/states/all?lamin=${data.minLat}&lomin=${data.minLon}&lamax=${data.maxLat}&lomax=${data.maxLon}`;
        console.log(url);
    } catch (error) {
        console.error('Error fetching flights data:', error);
    }
}
const { minLat, maxLat, minLon, maxLon } = await getTrackingArea(airportInformation);
getFlightsData(minLat, maxLat, minLon, maxLon);

/*
1. Fetch airport data by IATA code
2. Extract latitude, longitude, Wikipedia link, and Flightradar24 URL
3. Get the boundary box of the airport
4. Return the data
*/

