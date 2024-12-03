import request from 'supertest'
import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrg } from '__test__/factories/make-org.factory'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

describe('[Integration] Fetch Nearby Orgs Controller', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('Should be able to get nearby orgs', async () => {
    const password = 'acnd2341'
    const org = makeOrg({ password: await bcrypt.hash(password, 6) })
    await prisma.org.create({ data: org })

    const response = await request(app.server)
      .get('/orgs/nearby')
      .query({ latitude: org.latitude, longitude: org.longitude })
      .expect(200)

    expect(response.body.orgs).toHaveLength(1)
    expect(response.body.orgs[0].name).toEqual(org.name)
  })
})
