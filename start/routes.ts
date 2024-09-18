/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/', async () => {
      return {
        hello: 'world',
      }
    })

    router.get('/candidates', '#controllers/candidates_controller')

    router.post('/candidates/:candidateId/comments', '#controllers/comments_controller.store')
    router.post('/candidates/:candidateId/votes', '#controllers/votes_controller.store')
    router.get('/candidate', '#controllers/candidates_controller.show')

    router.get('/votes', '#controllers/votes_controller.index')
  })
  .prefix('/api')
