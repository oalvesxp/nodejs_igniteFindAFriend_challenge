import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrg } from '__test__/factories/make-org.factory'
import request from 'supertest'
import { app } from '@/app'

describe('[Integration] Register Controller', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('Shoud be able to create a new org', async () => {
    const response = await request(app.server).post('/orgs').send(makeOrg())

    expect(response.statusCode).toEqual(201)
  })
})
