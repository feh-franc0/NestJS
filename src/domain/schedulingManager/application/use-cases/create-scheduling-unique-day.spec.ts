import { InMemoryUniqueDaySchedulingRepository } from 'test/repositories/in-memory-unique-day-scheduling-repository'
import { CreateUniqueDaySchedulingUseCase } from './create-scheduling-unique-day'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryUniqueDaySchedulingRepository: InMemoryUniqueDaySchedulingRepository
let sut: CreateUniqueDaySchedulingUseCase

describe('Create Employee', () => {
  beforeEach(() => {
    inMemoryUniqueDaySchedulingRepository =
      new InMemoryUniqueDaySchedulingRepository()
    sut = new CreateUniqueDaySchedulingUseCase(
      inMemoryUniqueDaySchedulingRepository,
    ) // system under test
  })

  it('should be able to create a employee', async () => {
    const result = await sut.execute({
      companyId: '1',
      patientId: '1',
      employeeId: '1',
      address: 'rua 2',
      startScheduleTimestamp: new Date(2024, 1, 10, 13, 30).getTime(), // 2024/fev/10 - 13:30
      closingScheduleTimestamp: new Date(2024, 1, 10, 14, 30).getTime(), // 2024/fev/10 - 14:30
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(inMemoryUniqueDaySchedulingRepository.items[0]).toEqual(
        result.value.scheduling,
      )
    }
  })
})
