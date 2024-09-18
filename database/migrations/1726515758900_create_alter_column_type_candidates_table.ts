import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'alter_column_type_candidates'

  public async up() {
    this.schema.alterTable('candidates', (table) => {
      table.string('reference_number').alter()
    })
  }

  public async down() {
    this.schema.alterTable('candidates', (table) => {
      table.integer('reference_number').alter()
    })
  }
}
