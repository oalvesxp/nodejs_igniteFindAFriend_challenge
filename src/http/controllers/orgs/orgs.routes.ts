import { FastifyInstance } from 'fastify'

import { createOrgController } from './create.controller'
import { authenticateOrgController } from './authenticate.controller'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrgController)
  app.post('/orgs/sessions', authenticateOrgController)
}
