import { BaseModel, column } from '@adonisjs/lucid/orm'
import { Role } from '../enums/role.js'
import { DateTime } from 'luxon'

export default class Vote extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare candidateId: number

  @column()
  declare email: string

  @column()
  declare ipClient: string

  @column()
  declare quantity: number

  @column()
  declare role: Role

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
