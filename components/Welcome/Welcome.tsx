import { Title, Text } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>

      <Title className={classes.title} ta="center" mt={120}>
      <Text inherit variant="gradient" component="span" gradient={{ from: 'blue.3', to: 'indigo.9' }}>
          Beluga Arrivals
      </Text>
      </Title>

    </>
  );
}
