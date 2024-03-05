import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeEmployee } from '../../../../../test/factories/make-employee'
import { InMemoryEmployeeRepository } from '../../../../../test/repositories/in-memory-employee-repository'
import { DeleteEmployeeUseCase } from './delete-employee'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository
let sut: DeleteEmployeeUseCase

describe('Delete Employee', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    sut = new DeleteEmployeeUseCase(inMemoryEmployeeRepository) // system under test
  })

  it('should be able to delete a employee', async () => {
    const newEmployee = makeEmployee({}, new UniqueEntityID('employee-1'))
    await inMemoryEmployeeRepository.create(newEmployee)

    await sut.execute({
      employeeId: 'employee-1',
      isCompany: true,
    })

    expect(inMemoryEmployeeRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a employee if you are not an Company', async () => {
    const newEmployee = makeEmployee({}, new UniqueEntityID('employee-1'))
    await inMemoryEmployeeRepository.create(newEmployee)

    const result = await sut.execute({
      employeeId: 'employee-1',
      isCompany: false,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
