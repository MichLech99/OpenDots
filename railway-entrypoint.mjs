import { chownSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

// Mounted volumes may belong to root even when the image directory does not.
// Prepare only the configured database directory, then run the app as node.
process.env.DATABASE_PATH ||= '/data/opendots.sqlite';
if (process.env.DATABASE_PATH !== ':memory:') {
  const database = resolve(process.env.DATABASE_PATH);
  const directory = dirname(database);
  mkdirSync(directory, { recursive: true });
  if (process.getuid() === 0) {
    chownSync(directory, 1000, 1000);
    for (const file of [database, `${database}-wal`, `${database}-shm`]) {
      if (existsSync(file)) chownSync(file, 1000, 1000);
    }
  }
}
if (process.getuid() === 0) {
  process.setgroups([]);
  process.setgid(1000);
  process.setuid(1000);
}
await import('./dist/server/server/index.js');
