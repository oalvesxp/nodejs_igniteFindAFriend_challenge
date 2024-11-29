import { OrgsRepository } from '@/repositories/orgs.repository'
import { Org } from '@prisma/client'

import bcrypt from 'bcryptjs'

interface CreateOrgUseCaseRequest {
  name: string
  author_name: string
  email: string
  password: string
  whatsapp: string
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
  latitude: number
  longitude: number
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    author_name,
    email,
    password,
    whatsapp,
    cep,
    street,
    neighborhood,
    city,
    state,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const password_hash = await bcrypt.hash(password, 6)
    const org = await this.orgsRepository.create({
      name,
      author_name,
      email,
      whatsapp,
      password: password_hash,
      cep,
      street,
      neighborhood,
      city,
      state,
      latitude,
      longitude,
    })

    return {
      org,
    }
  }
}
