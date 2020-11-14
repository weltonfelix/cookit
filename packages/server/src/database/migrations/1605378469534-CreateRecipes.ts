import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRecipes1605378469534 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'recipes',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'picture',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'author',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'prep_time',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'stars',
            type: 'integer',
            isNullable: false,
            default: 0,
          },
          {
            name: 'directions',
            type: 'text',
            isArray: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('recipes');
  }
}
