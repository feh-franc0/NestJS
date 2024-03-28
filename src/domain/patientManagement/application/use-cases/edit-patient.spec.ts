import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makePatient } from '../../../../../test/factories/make-patient'
import { InMemoryPatientsRepository } from '../../../../../test/repositories/in-memory-patient-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { EditPatientUseCase } from './edit-patient'
import { InMemoryPatientAttachmentsRepository } from 'test/repositories/in-memory-patient-attachments-repository'
import { makePatientAttachment } from 'test/factories/make-patient-attachment'

let inMemoryPatientsRepository: InMemoryPatientsRepository
let inMemoryPatientAttachmentsRepository: InMemoryPatientAttachmentsRepository
let sut: EditPatientUseCase

describe('Edit Patient', () => {
  beforeEach(() => {
    inMemoryPatientAttachmentsRepository =
      new InMemoryPatientAttachmentsRepository()
    inMemoryPatientsRepository = new InMemoryPatientsRepository(
      inMemoryPatientAttachmentsRepository,
    )

    sut = new EditPatientUseCase(
      inMemoryPatientsRepository,
      inMemoryPatientAttachmentsRepository,
    ) // system under test
  })

  it('should be able to edit a patient', async () => {
    const newPatient = makePatient(
      { companyId: new UniqueEntityID('company-1') },
      new UniqueEntityID('patient-1'),
    )

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
      patientId: newPatient.id.toValue(),
      companyId: 'company-1',
      name: 'fernando',
      email: 'fernando@gmail.com',
      password: 'fernando123',
      attachmentsIds: ['1', '3'],
    })

    expect(inMemoryPatientsRepository.items[0]).toMatchObject({
      name: 'fernando',
      email: 'fernando@gmail.com',
      password: 'fernando123',
    })
    // console.log(inMemoryPatientsRepository.items[0].attachments.currentItems)
    // expect(
    //   inMemoryPatientsRepository.items[0].attachments.currentItems,
    // ).toHaveLength(2)
    // expect(
    //   inMemoryPatientsRepository.items[0].attachments.currentItems,
    // ).toEqual([
    //   expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
    //   expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
    // ])
  })

  it('should not be able to edit a patient if you are not an Company', async () => {
    const newPatient = makePatient(
      { companyId: new UniqueEntityID('company-1') },
      new UniqueEntityID('patient-1'),
    )

    await inMemoryPatientsRepository.create(newPatient)

    const result = await sut.execute({
      patientId: newPatient.id.toValue(),
      companyId: 'company-2',
      name: 'fernando',
      email: 'fernando@gmail.com',
      password: 'fernando123',
      attachmentsIds: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
