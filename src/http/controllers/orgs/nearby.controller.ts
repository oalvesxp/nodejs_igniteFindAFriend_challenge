import { makeFetchNearbyOrgUseCase } from '@/use-cases/factories/make-fetch-nearby-org.use-case.factory'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const querySchema = z.object({
  latitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

export async function fetchNearbyOrgController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const query = querySchema.parse(req.query)
  const fetchNearbyOrgUseCase = makeFetchNearbyOrgUseCase()

  try {
    const { orgs } = await fetchNearbyOrgUseCase.execute({
      userLatitude: query.latitude,
      userLongitude: query.longitude,
    })

    return rep.status(200).send({ orgs })
  } catch (err) {}
}
