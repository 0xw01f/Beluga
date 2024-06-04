'use server';

const API_KEY = process.env.RAPIDAPI_KEY;
const API_HOST = 'flightradar243.p.rapidapi.com';
const SUPPORTED_QUERIES = ['TLS', 'XFW', 'BRE', 'SVQ', 'CEG', 'SNR', 'IGS', 'QYM', 'LDE', 'PGF', 'BOD', 'BYF'];
const AIRPORT_LABELS = {
    'TLS': 'Toulouse',
    'XFW': 'Hambourg',
    'BRE': 'Brême',
    'SVQ': 'Séville',
    'CEG': 'Chester',
    'SNR': 'Saint-Nazaire',
    'IGS': 'Ingolstadt',
    'QYM': 'Madrid',
    'LDE': 'Tarbes',
    'PGF': 'Perpignan',
    'BOD': 'Bordeaux',
    'BYF': 'Albert'
};

async function fetchFlights(code: string) {
    const apiUrl = `https://${API_HOST}/v1/airports/arrivals?code=${code}&limit=100&page=1`;

    const headers = new Headers();
    if (API_KEY) {
        headers.set('X-Rapidapi-Key', API_KEY);
    }
    headers.set('X-Rapidapi-Host', "flightradar243.p.rapidapi.com");

    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    const result = await response.json();

    // Extract the flights data
    const flights = result?.data?.airport?.pluginData?.schedule?.arrivals?.data || [];

    // Filter flights based on ICAO code
    const filteredFlights = flights.filter((flight: { flight: { owner: { code: { icao: string; }; }; }; }) => 
        flight?.flight?.owner?.code?.icao === 'BGA'
    );

    return filteredFlights.map((flight: any) => ({
        flight,
        airport: AIRPORT_LABELS[code as keyof typeof AIRPORT_LABELS]
    }));
}

export async function callApi(searchQuery: string) {
    if (searchQuery === 'ALL') {
        const promises = SUPPORTED_QUERIES.map(code => fetchFlights(code));
        const results = await Promise.all(promises);
        return results.flat();
    } else if (SUPPORTED_QUERIES.includes(searchQuery)) {
        return await fetchFlights(searchQuery);
    } else {
        throw new Error('Query not supported');
    }
}
