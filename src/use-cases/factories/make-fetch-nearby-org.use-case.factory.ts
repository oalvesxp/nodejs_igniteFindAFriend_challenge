import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { FetchNearbyOrgsUseCase } from '../fetch-nearby-orgs.use-case'

export function makeFetchNearbyOrgUseCase() {
  return new FetchNearbyOrgsUseCase(new PrismaOrgsRepository())
}
