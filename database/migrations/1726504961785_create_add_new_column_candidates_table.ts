import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'add_new_column_candidates'

  async up() {
    this.schema.table('candidates', (table) => {
      table.string('color')
    })
  }

  async down() {
    this.schema.table('candidates', (table) => {
      table.dropColumn('color')
    })
  }
}
