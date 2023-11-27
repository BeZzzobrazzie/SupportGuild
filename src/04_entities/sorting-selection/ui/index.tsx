import { Box, Group, Button, Text, Center, rem } from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { SortingSelectionModel } from '..';
import { useStore } from 'effector-react';
import { $nameSortedReversed, $prefixSortedReversed } from '../model';

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

  function onSort(category : string) {
    SortingSelectionModel.clickedSort(category);
  }

  const [prefixSorted, prefixReversed] = useStore($prefixSortedReversed);
  const [nameSorted, nameReversed] = useStore($nameSortedReversed);

  return (
    <Box>
      <Button.Group>
        <SortButton reversed={prefixReversed} sorted={prefixSorted} onSort={() => onSort('prefix')}>
          Prefix
        </SortButton>
        <SortButton reversed={nameReversed} sorted={nameSorted} onSort={() => onSort('name')}>
          Name
        </SortButton>
      </Button.Group>

    </Box>
  )
}
