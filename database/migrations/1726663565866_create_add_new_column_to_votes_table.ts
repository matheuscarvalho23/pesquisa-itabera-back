import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'add_new_column_to_votes'

  async up() {
    this.schema.table('votes', (table) => {
      table.enum('role', ['prefeito', 'vereador'])
    })
  }

  async down() {
    this.schema.table('votes', (table) => {
      table.dropColumn('role')
    })
  }
}
