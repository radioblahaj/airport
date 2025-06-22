import chalk from 'chalk';

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
        // console.log(overhead);
        console.log(chalk.red(url));
    } catch (error) {
        console.error('Error fetching flights data:', error);
    }
}
export default getFlightsData;