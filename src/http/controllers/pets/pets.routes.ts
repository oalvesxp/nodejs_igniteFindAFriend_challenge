import { FastifyInstance } from 'fastify'

import { createPetController } from './create-pets.controller'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/orgs/pets', createPetController)
}
