import { makePatient } from 'test/factories/make-patient'
import { InMemoryPatientAttachmentsRepository } from 'test/repositories/in-memory-patient-attachments-repository'
import { InMemoryPatientsRepository } from 'test/repositories/in-memory-patient-repository'
import { MedicationOnPatientUseCase } from './medication-on-patient'
import { InMemoryPatientMedicationsRepository } from 'test/repositories/in-memory-patient-medications-repository'

let inMemoryPatientAttachmentsRepository: InMemoryPatientAttachmentsRepository
let inMemoryPatientsRepository: InMemoryPatientsRepository
let inMemoryPatientMedicationsRepository: InMemoryPatientMedicationsRepository
let sut: MedicationOnPatientUseCase

describe('Medication on Patient', () => {
  beforeEach(() => {
    inMemoryPatientAttachmentsRepository =
      new InMemoryPatientAttachmentsRepository()
    inMemoryPatientsRepository = new InMemoryPatientsRepository(
      inMemoryPatientAttachmentsRepository,
    )
    inMemoryPatientMedicationsRepository =
      new InMemoryPatientMedicationsRepository()

    sut = new MedicationOnPatientUseCase(
      inMemoryPatientsRepository,
      inMemoryPatientMedicationsRepository,
    )
  })

  it('should be able to medication on patient', async () => {
    const patient = makePatient()

    await inMemoryPatientsRepository.create(patient)

    await sut.execute({
      patientId: patient.id.toString(),
      type: { type: 'PILL' },
      dose: '',
      name: '',
      timing: '',
    })

    expect(inMemoryPatientMedicationsRepository.items[0].type).toEqual({
      type: 'PILL',
    })
  })
})
