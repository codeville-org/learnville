import * as migration_20260131_172825 from './20260131_172825';

export const migrations = [
  {
    up: migration_20260131_172825.up,
    down: migration_20260131_172825.down,
    name: '20260131_172825'
  },
];
