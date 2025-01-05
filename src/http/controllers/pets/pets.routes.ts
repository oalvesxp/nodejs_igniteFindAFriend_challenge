import { FastifyInstance } from 'fastify'

import { createPetController } from './create.controller'
import { getPetController } from './get.controller'
import { searchPetsController } from './search.controller'

import { verifyJWT } from '@/http/middlewares/verify-jwt.middleware'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/orgs/pets', { onRequest: [verifyJWT] }, createPetController)
  app.get('/orgs/pets/:id', getPetController)
  app.get('/orgs/pets', searchPetsController)
}
