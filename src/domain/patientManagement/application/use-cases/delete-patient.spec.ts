import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makePatient } from '../../../../../test/factories/make-patient'
import { InMemoryPatientsRepository } from '../../../../../test/repositories/in-memory-patient-repository'
import { DeletePatientUseCase } from './delete-patient'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryPatientAttachmentsRepository } from 'test/repositories/in-memory-patient-attachments-repository'
import { makePatientAttachment } from 'test/factories/make-patient-attachment'

let inMemoryPatientsRepository: InMemoryPatientsRepository
let inMemoryPatientAttachmentsRepository: InMemoryPatientAttachmentsRepository
let sut: DeletePatientUseCase

describe('Delete Patient', () => {
  beforeEach(() => {
    inMemoryPatientAttachmentsRepository =
      new InMemoryPatientAttachmentsRepository()
    inMemoryPatientsRepository = new InMemoryPatientsRepository(
      inMemoryPatientAttachmentsRepository,
    )

    sut = new DeletePatientUseCase(inMemoryPatientsRepository) // system under test
  })

  it('should be able to delete a patient', async () => {
    const newPatient = makePatient({}, new UniqueEntityID('patient-1'))
    await inMemoryPatientsRepository.create(newPatient)

    inMemoryPatientAttachmentsRepository.items.push(
      makePatientAttachment({
        patientId: newPatient.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makePatientAttachment({
        patientId: newPatient.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      patientId: 'patient-1',
      isCompany: true,
    })

    expect(inMemoryPatientsRepository.items).toHaveLength(0)
    expect(inMemoryPatientAttachmentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a patient if you are not an Company', async () => {
    const newPatient = makePatient({}, new UniqueEntityID('patient-1'))
    await inMemoryPatientsRepository.create(newPatient)

    const result = await sut.execute({
      patientId: 'patient-1',
      isCompany: false,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
