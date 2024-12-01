import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'

type Overwrite = {
  password?: string
}

export function makeOrg(overwrite?: Overwrite) {
  return {
    id: randomUUID(),
    name: faker.company.name(),
    author_name: faker.person.fullName(),
    email: faker.internet.email(),
    whatsapp: faker.phone.number(),
    password: overwrite?.password ?? faker.internet.password(),

    cep: faker.location.zipCode(),
    street: faker.location.street(),
    neighborhood: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),

    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  }
}
