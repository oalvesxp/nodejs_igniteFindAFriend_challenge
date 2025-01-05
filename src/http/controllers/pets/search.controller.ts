import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets.use-case.factory'

const querySchema = z.object({
  city: z.string().min(1),
  age: z.string().optional(),
  size: z.string().optional(),
  energy_level: z.string().optional(),
  environment: z.string().optional(),
})

export async function searchPetsController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { city, age, size, energy_level, environment } = querySchema.parse(
    req.query,
  )

  try {
    const searchPetsController = makeSearchPetsUseCase()

    const { pets } = await searchPetsController.execute({
      city,
      age,
      size,
      energy_level,
      environment,
    })

    return rep.status(200).send({ pets })
  } catch (err) {
    return rep.status(500).send({ message: 'Internal Server Error' })
  }
}
