import { OrgsRepository } from '@/repositories/orgs.repository'
import { compare } from 'bcryptjs'
import { Org } from '@prisma/client'

import { OrgNotFoundError } from './errors/org-not-found.error'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'

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
      throw new OrgNotFoundError()
    }

    const doesntPassowordMatches = await compare(password, org.password)

    if (!doesntPassowordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
