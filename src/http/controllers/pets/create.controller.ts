import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet.use-case.factory'
import { z } from 'zod'

import { OrgNotFoundError } from '@/use-cases/errors/org-not-found.error'

const createPetBodySchema = z.object({
  name: z.string(),
  about: z.string(),
  age: z.string(),
  size: z.string(),
  energy_level: z.string(),
  environment: z.string(),
})

export async function createPetController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const body = createPetBodySchema.parse(req.body)
  const org_id = req.user.sub

  try {
    const createPetUseCase = makeCreatePetUseCase()
    const { pet } = await createPetUseCase.execute({ ...body, org_id })

    return rep.status(201).send({ pet })
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return rep.status(404).send({ message: err.message })
    }

    throw err
  }
}
