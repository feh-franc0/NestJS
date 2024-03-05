import { CreateEmployeeUseCase } from './fetch-employees'
import { InMemoryEmployeeRepository } from '../../../../../test/repositories/in-memory-employee-repository'
import { makeEmployee } from '../../../../../test/factories/make-employee'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository
let sut: CreateEmployeeUseCase

describe('Fetch Employees', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    sut = new CreateEmployeeUseCase(inMemoryEmployeeRepository) // system under test
  })

  it('should be able to fetch employees', async () => {
    await inMemoryEmployeeRepository.create(makeEmployee({ name: 'fernando' }))
    await inMemoryEmployeeRepository.create(makeEmployee({ name: 'lipe' }))

    const result = await sut.execute({ page: 1 })

    // console.log(result.value?.employees)
    if (result.isRight()) {
      expect(result.value?.employees).toEqual([
        {
          _id: expect.anything(),
          props: expect.objectContaining({ name: 'fernando' }),
        },
        {
          _id: expect.anything(),
          props: expect.objectContaining({ name: 'lipe' }),
        },
      ])
    }
  })

  it('should be able to fetch paginated employees', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryEmployeeRepository.create(makeEmployee())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.employees).toHaveLength(2)
  })
})
