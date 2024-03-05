import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeEmployee } from '../../../../../test/factories/make-employee'
import { InMemoryEmployeeRepository } from '../../../../../test/repositories/in-memory-employee-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { EditEmployeeUseCase } from './edit-employee'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository
let sut: EditEmployeeUseCase

describe('Edit Employee', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    sut = new EditEmployeeUseCase(inMemoryEmployeeRepository) // system under test
  })

  it('should be able to edit a employee', async () => {
    const newEmployee = makeEmployee(
      { companyId: new UniqueEntityID('company-1') },
      new UniqueEntityID('employee-1'),
    )

    await inMemoryEmployeeRepository.create(newEmployee)

    await sut.execute({
      employeeId: newEmployee.id.toValue(),
      companyId: 'company-1',
      name: 'fernando',
      email: 'fernando@gmail.com',
      password: 'fernando123',
      department: 'ti',
      role: 'programador',
    })

    expect(inMemoryEmployeeRepository.items[0]).toMatchObject({
      name: 'fernando',
      email: 'fernando@gmail.com',
      password: 'fernando123',
      department: 'ti',
      role: 'programador',
    })
  })

  it('should not be able to edit a employee if you are not an Company', async () => {
    const newEmployee = makeEmployee(
      { companyId: new UniqueEntityID('company-1') },
      new UniqueEntityID('employee-1'),
    )

    await inMemoryEmployeeRepository.create(newEmployee)

    const result = await sut.execute({
      employeeId: newEmployee.id.toValue(),
      companyId: 'company-2',
      name: 'fernando',
      email: 'fernando@gmail.com',
      password: 'fernando123',
      department: 'ti',
      role: 'programador',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
