import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rename_column_votes'

  async up() {
    this.schema.table('votes', (table) => {
      table.renameColumn('ip_client', 'email')
    })
  }

  async down() {
    this.schema.table('votes', (table) => {
      table.renameColumn('ip_client', 'email')
    })
  }
}
