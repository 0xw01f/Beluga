import { Text, Flex, Anchor } from '@mantine/core';

export function SubText() {
  return (
    <Flex justify="center" align="center" mx="auto" mt="md" mb={140}>
      <Text c="dimmed" size="sm">
        If you want access to reports, advanced search, and our referral program,{' '}
        <Anchor href="https://t.me/yourtelegrambot" c="orange" inherit>
          join our Telegram bot here
        </Anchor>
        .
      </Text>
    </Flex>
  );
}
