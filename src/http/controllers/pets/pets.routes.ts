import { FastifyInstance } from 'fastify'

import { createPetController } from './create-pets.controller'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/pets', createPetController)
}
