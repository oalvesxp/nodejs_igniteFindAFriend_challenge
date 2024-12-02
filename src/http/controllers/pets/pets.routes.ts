import { FastifyInstance } from 'fastify'

import { createPetController } from './create.controller'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/orgs/pets', createPetController)
}
