import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { GetPetUseCase } from '@/use-cases/get-pet.use-case'

import { beforeEach, describe, expect, it } from 'vitest'
import { makePet } from '__test__/factories/make-pet.factory'

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('Should be able to get pet information', async () => {
    const pet = await petsRepository.create(makePet())
    const response = await sut.execute({ id: pet.id })

    expect(response.pet).toEqual(pet)
  })
})
