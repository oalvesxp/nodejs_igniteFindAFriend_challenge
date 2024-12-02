import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { AuthenticateOrgUseCase } from '@/use-cases/authenticate-org.use-case'

import { makeOrg } from '__test__/factories/make-org.factory'
import bcrypt from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('Should be able to authenticate an org', async () => {
    const password = 'abcd1234'
    const org = await orgsRepository.create(
      makeOrg({ password: await bcrypt.hash(password, 6) }),
    )

    const { org: authenticateResponse } = await sut.execute({
      email: org.email,
      password,
    })

    expect(authenticateResponse.id).toEqual(expect.any(String))
  })

  it.todo('Should not be able to authenticate an unexistent org')

  it.todo('Should not be able to authenticate with doesnt metch credentials')
})
