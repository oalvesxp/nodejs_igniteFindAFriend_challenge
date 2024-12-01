import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { CreateOrgUseCase } from '@/use-cases/create-org.use-case'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists.error'
import { makeOrg } from '__test__/factories/make-org.factory'

import { beforeEach, describe, expect, it } from 'vitest'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('Should be able to create a new org', async () => {
    const { org } = await sut.execute(makeOrg())

    expect(orgsRepository.items).toHaveLength(1)
    expect(org.id).toEqual(expect.any(String))
  })

  it('Should not be able to create a new org with an already used email', async () => {
    const org = makeOrg()

    await orgsRepository.create(org)
    await expect(sut.execute(org)).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
