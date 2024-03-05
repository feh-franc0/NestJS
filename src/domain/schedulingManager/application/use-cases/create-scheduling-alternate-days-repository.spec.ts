import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CreateAlternateSchedulingRepository } from './create-scheduling-alternate-days-repository'
import { InMemoryAlternateSchedulingRepository } from 'test/repositories/in-memory-alternate-days-scheduling-repository'

let inMemoryAlternateSchedulingRepository: InMemoryAlternateSchedulingRepository
let sut: CreateAlternateSchedulingRepository

describe('Create Alternate Scheduling', () => {
  beforeEach(() => {
    inMemoryAlternateSchedulingRepository =
      new InMemoryAlternateSchedulingRepository()
    sut = new CreateAlternateSchedulingRepository(
      inMemoryAlternateSchedulingRepository,
    ) // system under test
  })

  it('should be able to create alternate scheduling', async () => {
    const result = await sut.execute({
      companyId: new UniqueEntityID('1'),
      patientId: new UniqueEntityID('1'),
      employeeId: new UniqueEntityID('1'),
      address: 'rua 2',
      hoursOfServicePerConsultation: 2,
      hoursOfSpacingPerConsultation: 3,
      startHours: '15:00',
      closingHours: '16:00',
      startContractTimeStamp: new Date(2024, 0, 1, 13, 30).getTime(), // 2024/jan/01 - 13:30
      closingContractTimeStamp: new Date(2025, 0, 1, 13, 30).getTime(),
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      // console.log(result.value.scheduledSchedulingAlternateDays)
      expect(inMemoryAlternateSchedulingRepository.items).toEqual(
        result.value.scheduledSchedulingAlternateDays,
      )
    }
  })
})
