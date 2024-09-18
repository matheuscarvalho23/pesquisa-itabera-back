import type { HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { Role } from '../enums/role.js'
import Comment from './comment.js'
import { DateTime } from 'luxon'
import Vote from './vote.js'

export default class Candidate extends BaseModel {
  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @hasMany(() => Vote)
  declare votes: HasMany<typeof Vote>

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare politicalParty: string

  @column()
  declare referenceNumber: string

  @column()
  declare slogan: string

  @column()
  declare image: string

  @column()
  declare role: Role

  @column()
  declare color: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
