import chalk from 'chalk';

async function getFlightsData(minLat, maxLat, minLon, maxLon) {
    try {
        const url = `https://opensky-network.org/api/states/all?lamin=${minLat}&lomin=${minLon}&lamax=${maxLat}&lomax=${maxLon}`;
        const response = await fetch(url);
        const overhead = await response.json();

        if (!overhead.states) {
            console.log(chalk.red(url));
            return [];
        }

        const flightData = overhead.states
            .filter(state => state[1] !== null)
            .map(state => ({
                icao24: state[0],
                callsign: state[1],
                originCountry: state[2],
                timePosition: state[3],
                baroAltitude: state[7],
                geoAltitude: state[13],
                velocity: state[9]
            }));

        console.log(chalk.red(url));
        return flightData;
    } catch (error) {
        console.error('Error fetching flights data:', error);
        return [];
    }
}


export default getFlightsData