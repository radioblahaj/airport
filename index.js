import airportData from 'airport-data-js';
import chalk from 'chalk';
import figlet from 'figlet';
import pkg from 'terminal-kit';
import fetchAirportData from './utils/fetchAirportData.js';
import getTrackingArea from './utils/getTrackingArea.js';
import getFlightsData from './utils/getFlightsData.js';
import getFlightRadarData from './utils/getFlightRadarData.js';
import printFlightsData from './utils/printFlightData.js';

const { terminal: term } = pkg;

console.log(figlet.textSync('Flight Tracker', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
}));


async function func() {
    term('What IATA Airport do you want to check?');
    var input = await term.inputField().promise;
    input = input.toLocaleUpperCase();
    return input
}


const airportCode = await func();
console.log(airportCode)

const airportInformation = await fetchAirportData(airportCode);

// Get the tracking area based on the airport information
console.log(chalk.bgBlueBright('Tracking Area Information:'));
const { minLat, maxLat, minLon, maxLon } = await getTrackingArea(airportInformation);

// Fetch flights data based on the tracking area
console.log(chalk.bgGreenBright('Fetching Flights Data...'));

const getData = await printFlightsData(minLat, maxLat, minLon, maxLon);

// Fetch FlightRadar data for a specific callsign
console.log(chalk.bgYellowBright('Fetching FlightRadar Data...'));
// const callsign = "KLM204"
// await getFlightRadarData(callsign)

process.exit();



