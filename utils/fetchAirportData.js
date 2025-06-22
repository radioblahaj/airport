import airportData from 'airport-data-js';
import chalk from 'chalk';
import figlet from 'figlet';

async function fetchAirportData(airportCode) {
    try {
        const airport = await airportData.getAirportByIata(airportCode);
        const data = airport[0];
        const { latitude, longitude, wikipedia_link, flightradar24_url } = data;
        return { latitude, longitude, wikipedia_link, flightradar24_url };
    } catch (error) {
        console.error('Error fetching airport data:', error);
    }
}

export default fetchAirportData;
