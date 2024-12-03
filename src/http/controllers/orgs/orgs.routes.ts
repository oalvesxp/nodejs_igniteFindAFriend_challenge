import { FastifyInstance } from 'fastify'

import { createOrgController } from './create.controller'
import { authenticateOrgController } from './authenticate.controller'
import { fetchNearbyOrgController } from './nearby.controller'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrgController)
  app.post('/orgs/sessions', authenticateOrgController)
  app.get('/orgs/nearby', fetchNearbyOrgController)
}
