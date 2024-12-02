import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials.error'
import { makeAuthenticateOrgUseCase } from '@/use-cases/factories/make-authenticate-org.use-case.factory'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  email: z.string(),
  password: z.string().min(6),
})

export async function authenticateOrgController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateOrgUseCase = makeAuthenticateOrgUseCase()

    const { org } = await authenticateOrgUseCase.execute({
      email,
      password,
    })

    const token = await rep.jwtSign({
      sign: {
        sub: org.id,
      },
    })

    const refreshToken = await rep.jwtSign({
      sign: {
        sub: org.id,
        expiresIn: '7d',
      },
    })

    return rep
      .setCookie('refresh_token', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return rep.status(400).send({ message: err.message })
    }

    throw err
  }
}
