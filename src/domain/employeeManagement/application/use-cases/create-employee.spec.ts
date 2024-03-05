import { CreateEmployeeUseCase } from './create-employee'
import { InMemoryEmployeeRepository } from '../../../../../test/repositories/in-memory-employee-repository'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository
let sut: CreateEmployeeUseCase

describe('Create Employee', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    sut = new CreateEmployeeUseCase(inMemoryEmployeeRepository) // system under test
  })

  it('should be able to create a employee', async () => {
    const result = await sut.execute({
      companyId: '1',
      name: 'John Doe',
      email: 'john@doe.com',
      department: 'cuidador',
      role: 'gerente',
      password: '12345',
      confirmPassword: '12345',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(inMemoryEmployeeRepository.items[0]).toEqual(result.value.employee)
    }
  })
})
