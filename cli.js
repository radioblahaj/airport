#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import pkg from 'terminal-kit';
import fetchAirportData from './utils/fetchAirportData.js';
import getTrackingArea from './utils/getTrackingArea.js';
import getFlightsData from './utils/getFlightsData.js';
import getFlightRadarData from './utils/getFlightRadarData.js';

const { terminal: term } = pkg;

console.log(figlet.textSync('Flight Tracker', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
}));

async function main() {
    term('What IATA Airport do you want to check? ');
    let airportCode = await term.inputField().promise;
    airportCode = airportCode.toLocaleUpperCase();
    console.log('\n' + chalk.green(`Selected airport: ${airportCode}`));

    const airportInformation = await fetchAirportData(airportCode);

    // Get the tracking area based on the airport information
    console.log(chalk.bgBlueBright('Tracking Area Information:'));
    const { minLat, maxLat, minLon, maxLon } = await getTrackingArea(airportInformation);

    // Fetch flights data based on the tracking area
    console.log(chalk.bgGreenBright('Fetching Flights Data...'));
    await getFlightsData(minLat, maxLat, minLon, maxLon);

    // Prompt for callsign
    term('\nEnter a flight callsign to get FlightRadar data: ');
    let callsign = await term.inputField().promise;
    callsign = callsign.trim().toUpperCase();

    if (callsign) {
        console.log(chalk.bgYellowBright('Fetching FlightRadar Data...'));
        await getFlightRadarData(callsign);
    }

    process.exit();
}

main();