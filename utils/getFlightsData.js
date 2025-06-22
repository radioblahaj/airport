import chalk from 'chalk';
import getFlightRadarData from './getFlightRadarData.js';
import { skip } from '@prisma/client/runtime/library';

async function getFlightsData(minLat, maxLat, minLon, maxLon) {
    try {
        let data = {
            minLat: minLat,
            maxLat: maxLat,
            minLon: minLon,
            maxLon: maxLon
        };
        const url = `https://opensky-network.org/api/states/all?lamin=${data.minLat}&lomin=${data.minLon}&lamax=${data.maxLat}&lomax=${data.maxLon}`;
        const response = await fetch(url);
        const overhead = await response.json();
        const states = {
            icao24: overhead.states.map(state => state[0]),
            callsign: overhead.states.map(state => state[1]),
            originCountry: overhead.states.map(state => state[2]),
            timePosition: overhead.states.map(state => state[3]),
            lastContact: overhead.states.map(state => state[4]),
            longitude: overhead.states.map(state => state[5]),
            latitude: overhead.states.map(state => state[6]),
            baroAltitude: overhead.states.map(state => state[7]),
            onGround: overhead.states.map(state => state[8]),
            velocity: overhead.states.map(state => state[9]),
            trueTrack: overhead.states.map(state => state[10]),
            verticalRate: overhead.states.map(state => state[11]),
            sensors: overhead.states.map(state => state[12]),
            geoAltitude: overhead.states.map(state => state[13]),
            squawk: overhead.states.map(state => state[14]),
            spi: overhead.states.map(state => state[15]),
            positionSource: overhead.states.map(state => state[16])
        };

        for (let icao24 in states.icao24) {
            if (states.callsign[icao24] === null) {
                skip;
            }
           getFlightRadarData(states.callsign[icao24])
       
        }

        // console.log(overhead);
        console.log(chalk.red(url));
    } catch (error) {
        console.error('Error fetching flights data:', error);
    }
}
export default getFlightsData;