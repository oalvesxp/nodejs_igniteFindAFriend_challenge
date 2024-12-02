import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

import { makeOrg } from '__test__/factories/make-org.factory'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import bcrypt from 'bcryptjs'

describe('[Integration] Authenticate Org Controller', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('Should be able to authenticate an org', async () => {
    const password = 'acnd2341'
    const org = makeOrg({ password: await bcrypt.hash(password, 6) })
    await prisma.org.create({ data: org })

    const response = await request(app.server).post('/orgs/sessions').send({
      email: org.email,
      password,
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
