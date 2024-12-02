import { FastifyInstance } from 'fastify'

import { createPetController } from './create.controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt.middleware'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/orgs/pets', { onRequest: [verifyJWT] }, createPetController)
}
