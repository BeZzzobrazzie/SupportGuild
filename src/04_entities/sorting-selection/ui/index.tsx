import { Box, Group, Button, Text, Center, rem } from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp } from '@tabler/icons-react';

interface SSProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function SortButton({ children, reversed, sorted, onSort }: SSProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Button onClick={onSort} variant='default' radius="xs" rightSection={<Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    }>
      {children}
    </Button>
  )
}

export function SortingSelection() {

  return (
    <Box>
      <Button.Group>
        <SortButton reversed={true} sorted={false} onSort={() => console.log('')}>
          Prefix
        </SortButton>
        <SortButton reversed={true} sorted={true} onSort={() => console.log('')}>
          Name
        </SortButton>
      </Button.Group>

    </Box>
  )
}
