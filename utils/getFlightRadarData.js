import chalk from 'chalk';

async function getFlightRadarData(callsign) {
    try {
        const url = `https://www.flightradar24.com/v1/search/web/find?query=${callsign}`;
        const response = await fetch(url)
        const data = await response.json()
        // console.log(data)
        const flightRadarID = data.results[1].id
        const { ac_type, logo, reg, flight } = data.results[1].detail;
        console.log("------ FlightRadar Data ------");
        console.log(chalk.cyanBright(`Aircraft Type: ${ac_type}`));
        console.log(chalk.blueBright(`Flight Code: ${flight}`));
        console.log(chalk.yellowBright(`Registration: ${reg}`));
        // console.log(chalk.bgGreenBright(`Logo: ${logo}`));
        console.log(chalk.redBright(`Flight Radar ID: ${flightRadarID}`));
        console.log(chalk.magentaBright(`Callsign: ${callsign}`));
        const flightRadarURL = `https://www.flightradar24.com/${callsign}/${flightRadarID}`;
        console.log(`View in FlightRadar`, chalk.blueBright(flightRadarURL));
        console.log("-------------------------------");
        return flightRadarURL, ac_type;
    }
    catch (error) {
        console.error('Error fetching FlightRadar URL:', error);
    }
}

export default getFlightRadarData;