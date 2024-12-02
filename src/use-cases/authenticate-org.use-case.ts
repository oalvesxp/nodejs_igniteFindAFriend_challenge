import { OrgsRepository } from '@/repositories/orgs.repository'
import { Org } from '@prisma/client'

import { InvalidCredentialsError } from './errors/invalid-credentials.error'
import bcypt from 'bcryptjs'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCaseResponse {
  org: Org
}

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesntPassowordMatches = await bcypt.compare(password, org.password)

    if (!doesntPassowordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
