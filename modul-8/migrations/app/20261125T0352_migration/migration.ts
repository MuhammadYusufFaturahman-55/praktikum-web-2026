#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/6a6a98a89375a2b4ae24d7c4da690d4ba1d129c8902cb01b1aff7a5f896fa79a/contract';
import endContract from '../../snapshots/6a6a98a89375a2b4ae24d7c4da690d4ba1d129c8902cb01b1aff7a5f896fa79a/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  lit,
  primaryKey,
  sql,
  unique,
} from '@prisma/orm-mysql/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        table: 'User',
        columns: [
          col('CreatedAt', 'datetime(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'mysql/datetime@1', typeParams: { precision: 3 } },
          }),
          col('email', 'varchar(191)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 191 } },
          }),
          col('id', 'int', {
            notNull: true,
            default: fn(sql`autoincrement()`),
            codecRef: { codecId: 'mysql/int@1' },
          }),
          col('name', 'varchar(191)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 191 } },
          }),
          col('password', 'varchar(191)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 191 } },
          }),
          col('role', 'varchar(191)', {
            notNull: true,
            default: lit('Mahasiswa'),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 191 } },
          }),
        ],
        constraints: [primaryKey(['id']), unique(['email'], { name: 'User_email_key' })],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
