import { InMemoryDaysOfWeekSchedulingRepository } from 'test/repositories/in-memory-days-of-week-scheduling-repository'
import { CreateDaysOfWeekSchedulingUseCase } from './create-scheduling-days-of-week'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryDaysOfWeekSchedulingRepository: InMemoryDaysOfWeekSchedulingRepository
let sut: CreateDaysOfWeekSchedulingUseCase

describe('Create Employee', () => {
  beforeEach(() => {
    inMemoryDaysOfWeekSchedulingRepository =
      new InMemoryDaysOfWeekSchedulingRepository()
    sut = new CreateDaysOfWeekSchedulingUseCase(
      inMemoryDaysOfWeekSchedulingRepository,
    ) // system under test
  })

  it('should be able to create a employee', async () => {
    const result = await sut.execute({
      companyId: new UniqueEntityID('1'),
      patientId: new UniqueEntityID('1'),
      employeeId: new UniqueEntityID('1'),
      address: 'rua 2',
      scheduledDaysWeek: ['Monday', 'Wednesday', 'Friday'],
      startHours: '15:00',
      closingHours: '16:00',
      startContractTimeStamp: new Date(2024, 1, 10, 13, 30).getTime(), // 2024/fev/10 - 13:30
      closingContractTimeStamp: new Date(2025, 1, 10, 13, 30).getTime(),
      // startScheduleTimestamp: new Date(2024, 1, 10, 13, 30).getTime(), // 2024/fev/10 - 13:30
      // closingScheduleTimestamp: new Date(2024, 1, 10, 14, 30).getTime(), // 2024/fev/10 - 14:30
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      // console.log(result.value.scheduling)
      expect(inMemoryDaysOfWeekSchedulingRepository.items).toEqual(
        result.value.scheduling,
      )
    }
  })
})
