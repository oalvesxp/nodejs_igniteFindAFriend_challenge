import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { CreatePetUseCase } from '@/use-cases/create-pet.use-case'

import { makeOrg } from '__test__/factories/make-org.factory'
import { makePet } from '__test__/factories/make-pet.factory'
import { beforeAll, describe, expect, it } from 'vitest'

import { OrgNotFoundError } from '@/use-cases/errors/org-not-found.error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeAll(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('Should be able to create a new pet', async () => {
    const org = await orgsRepository.create(makeOrg())
    const { pet } = await sut.execute(makePet({ org_id: org.id }))

    expect(petsRepository.items).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })

  it('Should not be able to create a new pet with a non-existing org', async () => {
    const pet = makePet()

    await petsRepository.create(pet)

    await expect(sut.execute(pet)).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
