import chalk from 'chalk'; 

async function getFlightRadarData(callsign) {
    try {
        const url = `https://www.flightradar24.com/v1/search/web/find?query=${callsign}`;
        const response = await fetch(url)
        const data = await response.json()
        const { name, type} = data.results[0] || {};
        const flightRadarID = (data.results && data.results[1] && data.results[1].id) ? data.results[1].id : null;
      

        const detail = data.results[1] && data.results[1].detail ? data.results[1].detail : {};

        const { ac_type, logo, reg, flight, route } = detail;

        if (ac_type === undefined || flightRadarID === null) {
        return null;
        }
        // console.log("------ FlightRadar Data ------");
        // console.log(chalk.cyanBright(`Aircraft Type: ${ac_type}`));
        // console.log(chalk.blueBright(`Flight Code: ${flight}`));
        // console.log(chalk.yellowBright(`Registration: ${reg}`));
        // // console.log(chalk.bgGreenBright(`Logo: ${logo}`));
        // console.log(chalk.redBright(`Flight Radar ID: ${flightRadarID}`));
        // console.log(chalk.magentaBright(`Callsign: ${callsign}`));
        const flightRadarURL = `https://www.flightradar24.com/${callsign}/${flightRadarID}`;
        // console.log(`View in FlightRadar`, chalk.blueBright(flightRadarURL));
        return { flightRadarURL, ac_type, logo, reg, flight, flightRadarID, route, name, type };
    }
    catch (error) {
        console.error('Error fetching FlightRadar URL:', error);
    }
}

export default getFlightRadarData;