import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists.error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org.use-case.factory'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createOrgBodySchema = z.object({
  name: z.string(),
  author_name: z.string(),
  email: z.string().email(),
  password: z.string(),
  whatsapp: z.string(),
  cep: z.string(),
  street: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

export async function createOrgController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const createOrgUseCase = makeCreateOrgUseCase()

  try {
    const data = createOrgBodySchema.parse(req.body)
    const { org } = await createOrgUseCase.execute(data)

    return rep.status(201).send({ org })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return rep.status(409).send({ message: err.message })
    }

    throw err
  }
}
