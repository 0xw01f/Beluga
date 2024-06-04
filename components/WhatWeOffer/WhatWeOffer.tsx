'use client';

import { useDisclosure } from '@mantine/hooks';
import { Text, Flex, Button, Modal } from '@mantine/core';

export function WhatWeOffer() {
    const [opened, { open, close }] = useDisclosure(false);

    // Redirect user to telegram in new tab
    const handleTelegram = () => {
      window.open('https://t.me/osint_world_bot', '_blank');
    };

  return (

    <Flex justify="center" align="center" mx="auto" mt="md">
    <Button
      onClick={open}
      size="xs"
      radius="xl"
      variant="gradient"
      gradient={{ from: 'pink', to: 'yellow' }}>
          What We Offer
    </Button>

      <Modal opened={opened} onClose={close} title="Our service offers the following capabilities:">
        <Text size="lg">
<ul>
<li>Assess the security status of your passwords to identify any vulnerabilities.</li>

<li>Investigate and identify the source of any data breaches affecting your accounts.</li>

<li>Identify and address instances of telephonic abuse or spam.</li>

<li>Facilitate the return of misplaced documents to their rightful owners.</li>

<li>Obtain comprehensive ownership records for vehicles of interest.</li>

<li>And much more.</li>
</ul>
        </Text>
        <Flex justify="center" align="center" mx="auto" mt="md">
        <Button
          onClick={handleTelegram}
          size="sm"
          radius="xl"
          variant="gradient"
          gradient={{ from: 'pink', to: 'yellow' }}>
              Get Started Now
        </Button>
        </Flex>
      </Modal>
    </Flex>

  );
}
