'use client';

import { Anchor, Flex } from '@mantine/core';
import classes from './Footer.module.css';

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Store' },
  { link: '#', label: 'Careers' },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>

        <Flex justify="center" align="center" direction="column">
            <p className={classes.text}>
            Ce service utilise l&apos;API de Flightradar24 depuis RapidAPI.
            </p>
        </Flex>

    </div>
  );
}