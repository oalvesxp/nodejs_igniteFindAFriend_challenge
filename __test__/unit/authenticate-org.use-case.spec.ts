import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { AuthenticateOrgUseCase } from '@/use-cases/authenticate-org.use-case'

import { makeOrg } from '__test__/factories/make-org.factory'
import { beforeEach, describe, expect, it } from 'vitest'
import bcrypt from 'bcryptjs'

import { OrgNotFoundError } from '@/use-cases/errors/org-not-found.error'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials.error'

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

  it('Should not be able to authenticate an unexistent org', async () => {
    const password = await bcrypt.hash('abcd1234', 6)

    await expect(() =>
      sut.execute({
        email: 'jhon.doe@example.com',
        password,
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })

  it('Should not be able to authenticate with doesnt metch credentials', async () => {
    const password = await bcrypt.hash('abcd1234', 6)
    const org = await orgsRepository.create(makeOrg())

    await expect(() =>
      sut.execute({
        email: org.email,
        password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
