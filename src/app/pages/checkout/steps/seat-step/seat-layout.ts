const NORMAL_BLOCK_SIZES = [4, 20, 4];
const ACCESSIBLE_BLOCK_SIZES = [2, 10, 2];

const ROOM_LAYOUT: any[] = [
  ...['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((row) => ({ row, type: 'standard' })),
  { row: 'J', type: 'accessible' },
  ...['L', 'M', 'N', 'O', 'P', 'Q'].map((row) => ({ row, type: 'standard' })),
  ...['R', 'S', 'T'].map((row) => ({ row, type: 'vip' })),
];

export function buildSeatRows(occupied: string[], selected: string[]) {
  return ROOM_LAYOUT.map(({ row, type }) => buildRow(row, type, occupied, selected));
}

function buildRow(row: string, type: any, occupied: string[], selected: string[]) {
  const blockSizes = type === 'accessible' ? ACCESSIBLE_BLOCK_SIZES : NORMAL_BLOCK_SIZES;

  let seatNumber = 1;

  const blocks: any[][] = blockSizes.map((size) =>
    Array.from({ length: size }, () => {
      const code = `${row}${seatNumber++}`;
      return { code, type, status: getSeatStatus(code, occupied, selected) };
    }),
  );

  return { row, type, blocks };
}

function getSeatStatus(code: string, occupied: string[], selected: string[]) {
  if (occupied.includes(code)) return 'occupied';
  if (selected.includes(code)) return 'selected';

  return 'available';
}
