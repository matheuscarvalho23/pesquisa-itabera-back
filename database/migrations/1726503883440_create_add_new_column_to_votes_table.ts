import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'add_new_column_to_votes'

  async up() {
    this.schema.table('votes', (table) => {
      table.string('ip_client')
    })
  }

  async down() {
    this.schema.table('votes', (table) => {
      table.dropColumn('ip_client')
    })
  }
}
