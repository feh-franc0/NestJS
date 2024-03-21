import { makePatient } from 'test/factories/make-patient'
import { InMemoryPatientAttachmentsRepository } from 'test/repositories/in-memory-patient-attachments-repository'
import { InMemoryPatientsRepository } from 'test/repositories/in-memory-patient-repository'
import { AppointmentOnPatientUseCase } from './appointment-on-patient'
import { InMemoryPatientAppointmentsRepository } from 'test/repositories/in-memory-patient-appointments-repository'

let inMemoryPatientAttachmentsRepository: InMemoryPatientAttachmentsRepository
let inMemoryPatientsRepository: InMemoryPatientsRepository
let inMemoryPatientAppointmentsRepository: InMemoryPatientAppointmentsRepository
let sut: AppointmentOnPatientUseCase

describe('Appointment on Patient', () => {
  beforeEach(() => {
    inMemoryPatientAttachmentsRepository =
      new InMemoryPatientAttachmentsRepository()
    inMemoryPatientsRepository = new InMemoryPatientsRepository(
      inMemoryPatientAttachmentsRepository,
    )
    inMemoryPatientAppointmentsRepository =
      new InMemoryPatientAppointmentsRepository()

    sut = new AppointmentOnPatientUseCase(
      inMemoryPatientsRepository,
      inMemoryPatientAppointmentsRepository,
    )
  })

  it('should be able to appointment on patient', async () => {
    const patient = makePatient()

    await inMemoryPatientsRepository.create(patient)

    await sut.execute({
      patientId: patient.id.toString(),
      companyId: patient.companyId.toString(),
      consultationFee: 'Criado Appointment',
      employeeId: '',
      initialConsultDate: 10000000000,
      finalConsultDate: 10000000001,
      residenceAddress: '',
    })

    expect(
      inMemoryPatientAppointmentsRepository.items[0].consultationFee,
    ).toEqual('Criado Appointment')
  })
})
