import fastify from 'fastify'

export const app = fastify()

app.get('/', (_, rep) => {
  return rep.status(200)
    .send({ 
      hello: 'World' 
    })
})