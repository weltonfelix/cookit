/* eslint-disable indent */
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateRecipeIngredients1605383931470
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'recipe_ingredients',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'recipe_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'ingredient_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'unit_id',
            type: 'integer',
            isNullable: false,
          },

          {
            name: 'quantity',
            type: 'varchar',
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createForeignKeys('recipe_ingredients', [
      new TableForeignKey({
        name: 'Recipe',
        columnNames: ['recipe_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'recipes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'Ingredient',
        columnNames: ['ingredient_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ingredients',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'QuantityUnit',
        columnNames: ['unit_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'measurement_units',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('recipe_ingredients', 'Recipe');
    await queryRunner.dropForeignKey('recipe_ingredients', 'Ingredient');
    await queryRunner.dropForeignKey('recipe_ingredients', 'QuantityUnit');

    await queryRunner.dropTable('recipe_ingredients');
  }
}
