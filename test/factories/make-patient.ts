import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Patient,
  PatientProps,
} from '@/domain/patientManagement/enterprise/entities/patient'

export function makePatient(
  override: Partial<PatientProps> = {},
  id?: UniqueEntityID,
) {
  const patient = Patient.create(
    {
      companyId: new UniqueEntityID('1'),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return patient
}
