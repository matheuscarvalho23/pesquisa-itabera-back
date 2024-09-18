import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rename_column_candidates'

  async up() {
    this.schema.table('candidates', (table) => {
      table.renameColumn('politicalParty', 'political_party')
      table.renameColumn('referenceNumber', 'reference_number')
    })
  }

  async down() {
    this.schema.table('candidates', (table) => {
      table.renameColumn('politicalParty', 'political_party')
      table.renameColumn('referenceNumber', 'reference_number')
    })
  }
}
