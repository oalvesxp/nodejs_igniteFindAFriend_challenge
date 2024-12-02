import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'

import { makeOrg } from '__test__/factories/make-org.factory'
import { makePet } from '__test__/factories/make-pet.factory'
import bcrypt from 'bcryptjs'

describe('[Integration] Create Pet Controller ', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('Should be able to create a new pet', async () => {
    const password = 'abcd1234'
    const mockOrgData = makeOrg({ password: await bcrypt.hash(password, 6) })

    const org = await prisma.org.create({ data: mockOrgData })

    const authResponse = await request(app.server).post('/orgs/sessions').send({
      email: org.email,
      password,
    })

    const { token } = authResponse.body

    const mockPetData = makePet()

    const response = await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(mockPetData)

    expect(response.status).toBe(201)
  })
})
