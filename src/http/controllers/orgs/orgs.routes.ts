import { FastifyInstance } from 'fastify'
import { createOrgController } from './create.controller'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrgController)
}
