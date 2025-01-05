import request from 'supertest'
import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makePet } from '__test__/factories/make-pet.factory'
import { makeOrg } from '__test__/factories/make-org.factory'

describe('[Integration] Get Pet Controller', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('Should be able to get a pet by ID', async () => {
    const org = makeOrg()
    await request(app.server).post('/orgs').send(org)

    const authenticateResponse = await request(app.server)
      .post('/orgs/sessions')
      .send({
        email: org.email,
        password: org.password,
      })

    const createPetResponse = await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authenticateResponse.body.token}`)
      .send(makePet())

    const response = await request(app.server)
      .get(`/orgs/pets/${createPetResponse.body.pet.id}`)
      .set('Authorization', `Bearer ${authenticateResponse.body.token}`)

    expect(response.status).toBe(200)
  })
})
