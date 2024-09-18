import type { HttpContext } from '@adonisjs/core/http'
import Candidate from '#models/candidate'

export default class CandidatesController {
  public async index({ response }: HttpContext) {
    try {
      const candidates = await Candidate.query()
        .preload('comments')
        .withCount('votes', (query) => {
          query.sum('quantity as total_votes')
        })
        .orderBy('id', 'asc')
      return {
        data: candidates.map((candidate) => {
          return {
            ...candidate.toJSON(),
            total_votes: Number(candidate.$extras.votes_count) || 0,
          }
        }),
      }
    } catch (error) {
      console.log(error)

      return response.internalServerError({ message: 'Erro ao buscar candidatos' })
    }
  }

  public async show({ request, response }: HttpContext) {
    try {
      const number = request.input('search')

      const candidate = await Candidate.query()
        .preload('comments')
        .orderBy('id', 'asc')
        .where('reference_number', number)
        .withCount('votes', (query) => {
          query.sum('quantity as total_votes')
        })
        .first()

      if (candidate) {
        return {
          data: candidate,
          total_votes: Number(candidate.$extras.votes_count) || 0,
        }
      }

      if (!candidate) {
        return response.status(404).json({ message: 'Candidato não encontrado !' })
      }
    } catch (error) {
      console.log(error)

      return response.status(403).json({ message: 'Não foi possível buscar o candidato !' })
    }
  }
}
