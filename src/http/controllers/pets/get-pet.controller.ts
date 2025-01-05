import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet.use-case.factory'
import { PetNotFoundError } from '@/use-cases/errors/pet-not-found.error'

const routeSchema = z.object({
  id: z.string().uuid(),
})

export async function getPetController(req: FastifyRequest, rep: FastifyReply) {
  const { id } = routeSchema.parse(req.params)

  try {
    const getPetUseCase = makeGetPetUseCase()
    const pet = await getPetUseCase.execute({ id })

    return rep.status(200).send({ pet })
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return rep.status(404).send({ message: err.message })
    }

    return rep.status(500).send({ message: 'Internal Server Error' })
  }
}
