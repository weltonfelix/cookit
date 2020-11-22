/* eslint-disable indent */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCreatedAtAndUpdatedAtColumns1606062524158
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('ingredients', [
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      }),
    ]);

    await queryRunner.addColumns('measurement_units', [
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      }),
    ]);

    await queryRunner.addColumns('recipe_ingredients', [
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      }),
    ]);

    await queryRunner.addColumns('recipes', [
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('ingredients', 'created_at');
    await queryRunner.dropColumn('ingredients', 'updated_at');
    await queryRunner.dropColumn('measurement_units', 'created_at');
    await queryRunner.dropColumn('measurement_units', 'updated_at');
    await queryRunner.dropColumn('recipe_ingredients', 'created_at');
    await queryRunner.dropColumn('recipe_ingredients', 'updated_at');
    await queryRunner.dropColumn('recipes', 'created_at');
    await queryRunner.dropColumn('recipes', 'updated_at');
  }
}
