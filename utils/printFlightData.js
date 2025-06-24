import getFlightRadarData from "./getFlightRadarData.js";
import chalk from 'chalk';
import getFlightsData from "./getFlightsData.js";

async function printFlightsData(minLat, maxLat, minLon, maxLon) {
    try {
        let data = []
        let flightRadarData = {}
        let callsign = ""
        const flightData = await getFlightsData(minLat, maxLat, minLon, maxLon)
        for (let record in flightData) {
            callsign = flightData[record].callsign
            // console.log(flightData[record])
            flightRadarData = await getFlightRadarData(callsign)
            data.push(flightRadarData)
        }
        // console.log(data.length)


        //   const states = {
        //     icao24: overhead.states.map(state => state[0]),
        //     callsign: overhead.states.map(state => state[1]),

        if (data.length > 0) {
            for (let record in data) {
             
                if (!data[record] || !data[record].ac_type || !data[record].flightRadarID) {
                   console.log(chalk.redBright(`No santaized data found for record: ${record}, callsign: ${callsign}`));
                    continue;
                }
                // console.log(data[record].type)
                const allFlightData = {
                    type: (data[record] && data[record].type) ? data[record].type : null,
                    ac_type: data[record].ac_type,
                    reg: data[record].reg,
                    route: data[record].route
                }
            console.log(chalk.bgGreenBright(`Fetching Flights Data for ${data.length} flights...`));

            console.log(`------ Flight Data for ${record} ------`);

            // console.log(chalk.bgWhiteBright(`Origin Country: ${flightData.originCountry}`))
            // console.log(chalk.bgMagentaBright(`Callsign: ${callsign}`));
            // console.log(chalk.bgGreenBright(`Airline Name: ${name}`));
            console.log(chalk.bgGreenBright(`Flight Type: ${allFlightData.type}`));
            // console.log(chalk.bgBlueBright(`Flight Code: ${flight}`));
            console.log(chalk.bgGreenBright(`Route: ${allFlightData.route}`));
            // console.log(chalk.bgBlueBright(`Flight Code: ${flight}`));
            console.log(chalk.bgCyanBright(`Aircraft Type: ${allFlightData.ac_type}`));
            console.log(chalk.bgYellowBright(`Registration: ${allFlightData.reg}`));
            }
    

            // for (let i = 0; i > data.length)
            // const names = data.map(record => record.type);
            // console.log(names);
            // const { ac_type, logo, reg, flight, flightRadarID, name, route, type } = flightRadarData;
            // if (!ac_type || !flightRadarID) {
            //     return;
            // }
            // console.log("------ Flight Data------");
            // console.log(chalk.bgWhiteBright(`Origin Country: ${flightData.originCountry}`))
            // console.log(chalk.bgMagentaBright(`Callsign: ${callsign}`));
            // console.log(chalk.bgGreenBright(`Airline Name: ${name}`));
            // console.log(chalk.bgGreenBright(`Flight Type: ${type}`));
            // console.log(chalk.bgBlueBright(`Flight Code: ${flight}`));
            // console.log(chalk.bgGreenBright(`Route: ${route}`));
            // console.log(chalk.bgBlueBright(`Flight Code: ${flight}`));
            // console.log(chalk.bgCyanBright(`Aircraft Type: ${ac_type}`));
            // console.log(chalk.bgYellowBright(`Registration: ${reg}`));
            // console.log(callsign)
            // console.log(chalk.greenBright(`View in FlightRadar: `, chalk.blueBright(`https://www.flightradar24.com/${callsign.trim()}/${flightRadarID}`)))
            // // console.log(chalk.bgGreenBright(`Logo: ${logo}`));


        }



    } catch (error) {
        console.error('Error printing flight data:', error);
    }
}

export default printFlightsData;