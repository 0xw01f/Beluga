'use client';

import { useState } from 'react';
import { Select, Button, Flex, Box, Text, Card, Title, SimpleGrid, Divider } from '@mantine/core';
import { callApi } from '@/services/actions/callapi';

// Define interfaces for flight data
interface Flight {
  flight: {
    flight: { identification: any; status: any; aircraft: any; owner: any; time: any; airport: any; };
    identification: {
      id: string;
      callsign: string | null;
    };
    status: {
      text: string | null;
    };
    aircraft: {
      model: {
        text: string | null;
      };
      registration: string | null;
    };
    owner: {
      name: string | null;
      logo: string | null;
    };
    airport: {
      origin: {
        name: string | null;
      };
    };
    time: {
      scheduled: {
        departure: number | null;
        arrival: number | null;
      };
      real: {
        departure: number | null;
        arrival: number | null;
      };
      estimated: {
        departure: number | null;
        arrival: number | null;
      };
    };
  };
  airport: string;
}

// ResultCard component to display each flight
const ResultCard: React.FC<{ flight: Flight }> = ({ flight }) => {
  const { flight: flightData, airport } = flight;
  const { identification, aircraft, owner, time, airport: airportInfo } = flightData.flight;

  return (
    <Card shadow="sm" padding="lg" radius="lg" withBorder>
      <Title order={4}>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'blue.3', to: 'indigo.9' }}>
          {identification?.callsign || 'No Callsign'}
        </Text>
      </Title>
      <Text>
        <b>Destination:</b> {airport}
      </Text>
      <Text>
        <b>Appareil:</b> {aircraft?.model?.text || 'N/A'} ({aircraft?.registration || 'N/A'})
      </Text>
      <Text>
        <b>Propriétaire:</b> {owner?.name || 'N/A'}
      </Text>
      <Text>
        <b>Origine:</b> {airportInfo?.origin?.name || 'N/A'}
      </Text>
      <Text>
        <b>Départ Prévu:</b> {time?.scheduled?.departure ? new Date(time.scheduled.departure * 1000).toLocaleString() : 'N/A'}
      </Text>
      <Text>
        <b>Arrivée Prévue:</b> {time?.scheduled?.arrival ? new Date(time.scheduled.arrival * 1000).toLocaleString() : 'N/A'}
      </Text>
      <Text>
        <b>Arrivée Réelle:</b> {time?.real?.arrival ? new Date(time.real.arrival * 1000).toLocaleString() : 'N/A'}
      </Text>
      <Text>
        <b>Arrivée Estimée:</b> {time?.estimated?.arrival ? new Date(time.estimated.arrival * 1000).toLocaleString() : 'N/A'}
      </Text>
    </Card>
  );
};

export function SearchElement(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('TLS');
  const [results, setResults] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string>('');

  const handleSearch = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const result = await callApi(searchQuery);

      if (result.length === 0) {
        setInfo('Aucune donnée trouvée. Veuillez réessayer.');
        setResults([]);
      } else {
        setInfo('');
        setResults(result);
      }
    } catch (err) {
      setInfo('');
      if ((err as Error).message === 'Query not supported') {
        setError('Query not supported');
      } else {
        setError('An error occurred while fetching the data.');
      }
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      mx="auto"
      mt="xl"
      gap="md"
      direction="column"
      style={{ width: '100%', maxWidth: 1200, padding: '0 20px' }}
    >
      <Flex
        justify="center"
        align="center"
        ml={10}
        mr={10}
        gap="md"
        direction={{ base: 'column', sm: 'row' }}
        style={{ width: '100%' }}
      >
        <Select
          size="md"
          radius="xl"
          placeholder="Veuillez sélectionner un aéroport"
          style={{ width: '100%', maxWidth: 350 }}
          data={[
            { value: 'ALL', label: 'Tous les aéroports' },
            { value: 'TLS', label: 'TLS (Toulouse)' },
            { value: 'XFW', label: 'XFW (Hambourg)' },
            { value: 'BRE', label: 'BRE (Brême)' },
            { value: 'SVQ', label: 'SVQ (Séville)' },
            { value: 'CEG', label: 'CEG (Chester)' },
            { value: 'SNR', label: 'SNR (Saint-Nazaire)' },
            { value: 'IGS', label: 'IGS (Ingolstadt)' },
            { value: 'QYM', label: 'QYM (Madrid)' },
            { value: 'LDE', label: 'LDE (Tarbes)' },
            { value: 'PGF', label: 'PGF (Perpignan)' },
            { value: 'BOD', label: 'BOD (Bordeaux)' },
            { value: 'BYF', label: 'BYF (Aéroport Albert Picardie, Amiens)' },
          ]}
          value={searchQuery}
          onChange={(value) => setSearchQuery(value || '')}
        />
        <Button
          size="md"
          radius="xl"
          variant="gradient"
          style={{ width: '100%', maxWidth: 150 }}
          gradient={{ from: 'blue.3', to: 'indigo.9' }}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? '🛫' : 'Chercher'}
        </Button>
      </Flex>

      <Divider my="lg" />

      {error && (
        <Box mt="md">
          <Text c="red">{error}</Text>
        </Box>
      )}

      {info && (
        <Box mt="md">
          <Text c="gray">{info}</Text>
        </Box>
      )}

      {results.length > 0 && (
        <Box mt="md" style={{ width: '100%', maxWidth: 1200 }}>
          <Title mb={15} size={25}>Résultats: </Title>
          <SimpleGrid
            cols={1}
            mx={30}
            mb={40}
            spacing="lg"
          >
            {results.map((flight, index) => (
              <ResultCard key={index} flight={flight} />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Flex>
  );
}
