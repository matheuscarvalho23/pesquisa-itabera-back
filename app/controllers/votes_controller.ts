import type { HttpContext } from '@adonisjs/core/http'
import Vote from '#models/vote'
import Candidate from '#models/candidate'

export default class VotesController {
  public async store({ request, params, response }: HttpContext) {
    try {
      const body = request.body()
      const candidateId = params.candidateId
      const email = body.email
      const ipClient = body.ip_client
      const role = body.role

      const existingVote = await this.checkExistingVote(email, ipClient, role)

      if (existingVote) {
        return response.status(403).json({ message: 'Não é permitido votar mais de 1 vez !' })
      }

      body.candidateId = candidateId
      body.email = email
      body.ip_client = ipClient
      body.role = role

      const vote = await Vote.create(body)

      response.status(201)

      return {
        message: 'Voto adicionado com sucesso!',
        data: vote,
      }
    } catch (error) {
      return response.status(403).json({ message: 'Erro ao adicionar voto' })
    }
  }

  public async index({ request, response }: HttpContext) {
    try {
      const role = request.input('role')

      const totalQueryVotes = await Vote.query()
        .join('candidates', 'candidates.id', 'votes.candidate_id')
        .where('candidates.role', role)
        .sum('votes.quantity as total')
      const totalVotes = totalQueryVotes[0].$extras.total ?? 0

      if (totalVotes === 0) {
        return response.status(400).json({ message: 'Nenhum voto registrado.' })
      }

      const candidates = await Candidate.query()
        .select('id', 'name', 'reference_number', 'political_party', 'image', 'color')
        .where('role', role)
        .withAggregate('votes', (query) => {
          query.sum('quantity').as('candidate_votes')
        })
        .exec()

      const result = candidates.map((candidate) => {
        const candidateVotes = candidate.$extras.candidate_votes || 0
        const votePercentage = (candidateVotes / totalVotes) * 100

        return {
          id: candidate.id,
          name: candidate.name,
          image: candidate.image,
          color: candidate.color,
          reference_number: candidate.referenceNumber,
          votes_count: Number(candidateVotes),
          vote_percentage: parseFloat(votePercentage.toFixed(2)),
        }
      })

      result.sort((a, b) => b.vote_percentage - a.vote_percentage)

      return {
        total_votes: Number(totalVotes),
        candidates: result,
      }
    } catch (error) {
      console.log(error)
      return response.status(403).json({ message: 'Não foi possível contabilizar os votos !' })
    }
  }

  public async checkExistingVote(email: string, ipClient: string, role: string) {
    try {
      const existingVote = await Vote.query()
        .where((query) => {
          query.where('email', email).orWhere('ip_client', ipClient)
        })
        .andWhere('role', role)
        .first()

      return !!existingVote
    } catch (error) {
      return false
    }

    return 0
  }
}
