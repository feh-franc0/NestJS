import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Employee,
  EmployeeProps,
} from '@/domain/employeeManagement/enterprise/entities/employee'

export function makeEmployee(
  override: Partial<EmployeeProps> = {},
  id?: UniqueEntityID,
) {
  const employee = Employee.create(
    {
      companyId: new UniqueEntityID('1'),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      department: faker.helpers.arrayElement([
        'patientCare',
        'financeAndBilling',
        'humanResources',
      ]),
      role: faker.helpers.arrayElement([
        'generalPractitioner',
        'intensiveCareNurse',
        'clinicalPharmacist',
      ]),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return employee
}
