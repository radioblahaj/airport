import chalk from 'chalk';

async function getFlightRadarData(callsign) {
    try {
        const url = `https://www.flightradar24.com/v1/search/web/find?query=${callsign}`;
        const response = await fetch(url)
        const data = await response.json()
        // console.log(data)
        const flightRadarID = data.results[1].id
        const { ac_type, logo, reg, flight } = data.results[1].detail;
        console.log(chalk.bgCyanBright(`Aircraft Type: ${ac_type}`));
        console.log(chalk.bgBlueBright(`Flight Code: ${flight}`));
        console.log(chalk.bgYellowBright(`Registration: ${reg}`));
        console.log(chalk.bgGreenBright(`Logo: ${logo}`));
        console.log(chalk.bgRedBright(`Flight Radar ID: ${flightRadarID}`));
        console.log(chalk.bgMagentaBright(`Callsign: ${callsign}`));
        const flightRadarURL = `https://www.flightradar24.com/${callsign}/${flightRadarID}`;
        console.log(chalk.bgWhiteBright(flightRadarURL));
        return flightRadarURL, ac_type;
    }
    catch (error) {
        console.error('Error fetching FlightRadar URL:', error);
    }
}

export default getFlightRadarData;