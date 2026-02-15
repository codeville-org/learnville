import * as migration_20260131_172825 from './20260131_172825';
import * as migration_20260201_055509 from './20260201_055509';
import * as migration_20260215_134142 from './20260215_134142';

export const migrations = [
  {
    up: migration_20260131_172825.up,
    down: migration_20260131_172825.down,
    name: '20260131_172825',
  },
  {
    up: migration_20260201_055509.up,
    down: migration_20260201_055509.down,
    name: '20260201_055509',
  },
  {
    up: migration_20260215_134142.up,
    down: migration_20260215_134142.down,
    name: '20260215_134142'
  },
];
