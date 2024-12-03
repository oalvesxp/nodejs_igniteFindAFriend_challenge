import { prisma } from '@/lib/prisma'
import { Prisma, Org } from '@prisma/client'
import { FindManyNearbyParams, OrgsRepository } from '../orgs.repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async findManyNearby({
    longitude,
    latitude,
  }: FindManyNearbyParams): Promise<Org[]> {
    const orgs = await prisma.$queryRaw<Org[]>`
      SELECT *
        FROM orgs
        WHERE (
          6371 * acos(
            cos(radians(${latitude})) * 
            cos(radians(latitude)) * 
            cos(radians(longitude) - radians(${longitude})) + 
            sin(radians(${latitude})) * 
            sin(radians(latitude))
          )
        ) <= 10
    `

    return orgs
  }

  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}
