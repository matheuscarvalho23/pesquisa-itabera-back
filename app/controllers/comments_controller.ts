import type { HttpContext } from '@adonisjs/core/http'
import Candidate from '#models/candidate'
import Comment from '#models/comment'

export default class CommentsController {
  public async store({ request, params, response }: HttpContext) {
    try {
      const body = request.body()

      if (!body.author) {
        body.author = 'Anônimo'
      }

      const candidateId = params.candidateId

      await Candidate.findOrFail(candidateId)

      body.candidateId = candidateId

      const comment = await Comment.create(body)

      response.status(201)

      return {
        message: 'Comentário adicionado com sucesso!',
        data: comment,
      }
    } catch (error) {
      return response.internalServerError({ message: 'Ocorreu um erro ao adicionar um voto' })
    }
  }
}
