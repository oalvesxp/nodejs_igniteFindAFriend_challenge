import { Org, Prisma } from '@prisma/client'

interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface OrgsRepository {
  findManyNearby(params: FindManyNearbyParams): Promise<Org[]>
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  create(data: Prisma.OrgCreateInput): Promise<Org>
}
