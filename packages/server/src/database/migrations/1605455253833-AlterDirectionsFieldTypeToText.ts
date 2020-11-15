/* eslint-disable indent */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterDirectionsFieldTypeToText1605455253833
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('recipes', 'directions');

    await queryRunner.addColumn(
      'recipes',
      new TableColumn({
        name: 'directions',
        type: 'text',
        isArray: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('recipes', 'directions');

    await queryRunner.addColumn(
      'recipes',
      new TableColumn({
        name: 'directions',
        type: 'text',
        isArray: true,
      })
    );
  }
}
