import { OrgsRepository } from '@/repositories/orgs.repository'
import { Org } from '@prisma/client'

interface FechNearbyOrgsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FechNearbyOrgsUseCaseResponse {
  orgs: Org[]
}

export class FetchNearbyOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FechNearbyOrgsUseCaseRequest): Promise<FechNearbyOrgsUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      orgs,
    }
  }
}
