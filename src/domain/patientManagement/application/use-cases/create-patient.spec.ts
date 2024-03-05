import { CreatePatientUseCase } from './create-patient'
import { InMemoryPatientRepository } from '../../../../../test/repositories/in-memory-patient-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryPatientAttachmentsRepository } from 'test/repositories/in-memory-patient-attachments-repository'

let inMemoryPatientRepository: InMemoryPatientRepository
let inMemoryPatientAttachmentsRepository: InMemoryPatientAttachmentsRepository
let sut: CreatePatientUseCase

describe('Create Patient', () => {
  beforeEach(() => {
    inMemoryPatientAttachmentsRepository =
      new InMemoryPatientAttachmentsRepository()
    inMemoryPatientRepository = new InMemoryPatientRepository(
      inMemoryPatientAttachmentsRepository,
    )

    sut = new CreatePatientUseCase(inMemoryPatientRepository) // system under test
  })

  it('should be able to create a patient', async () => {
    const result = await sut.execute({
      companyId: '1',
      name: 'John Doe',
      email: 'john@doe.com',
      password: '12345',
      confirmPassword: '12345',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(inMemoryPatientRepository.items[0]).toEqual(result.value.patient)
      expect(
        inMemoryPatientRepository.items[0].attachments.currentItems,
      ).toHaveLength(2)
      expect(
        inMemoryPatientRepository.items[0].attachments.currentItems,
      ).toEqual([
        expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
        expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
      ])
    }
  })
})
