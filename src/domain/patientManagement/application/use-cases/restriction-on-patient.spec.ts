import { makePatient } from 'test/factories/make-patient'
import { InMemoryPatientAttachmentsRepository } from 'test/repositories/in-memory-patient-attachments-repository'
import { InMemoryPatientsRepository } from 'test/repositories/in-memory-patient-repository'
import { RestrictionOnPatientUseCase } from './restriction-on-patient'
import { InMemoryPatientRestrictionsRepository } from 'test/repositories/in-memory-patient-restrictions-repository'

let inMemoryPatientAttachmentsRepository: InMemoryPatientAttachmentsRepository
let inMemoryPatientsRepository: InMemoryPatientsRepository
let inMemoryPatientRestrictionsRepository: InMemoryPatientRestrictionsRepository
let sut: RestrictionOnPatientUseCase

describe('Restriction on Patient', () => {
  beforeEach(() => {
    inMemoryPatientAttachmentsRepository =
      new InMemoryPatientAttachmentsRepository()
    inMemoryPatientsRepository = new InMemoryPatientsRepository(
      inMemoryPatientAttachmentsRepository,
    )
    inMemoryPatientRestrictionsRepository =
      new InMemoryPatientRestrictionsRepository()

    sut = new RestrictionOnPatientUseCase(
      inMemoryPatientsRepository,
      inMemoryPatientRestrictionsRepository,
    )
  })

  it('should be able to restriction on patient', async () => {
    const patient = makePatient()

    await inMemoryPatientsRepository.create(patient)

    await sut.execute({
      patientId: patient.id.toString(),
      type: { type: 'ALLERGY' },
      name: '',
    })

    expect(inMemoryPatientRestrictionsRepository.items[0].type).toEqual({
      type: 'ALLERGY',
    })
  })
})
