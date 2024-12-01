import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'

import { makeOrg } from '__test__/factories/make-org.factory'
import { makePet } from '__test__/factories/make-pet.factory'

describe('[Integration] Create Pet Controller ', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('Should be able to create a new pet', async () => {
    const mockOrgData = makeOrg()
    const org = await prisma.org.create({ data: mockOrgData })

    const mockPetData = makePet({ org_id: org.id })

    const response = await request(app.server)
      .post('/orgs/pets')
      .send(mockPetData)

    console.log(response.body)

    expect(response.status).toBe(201)
  })
})
