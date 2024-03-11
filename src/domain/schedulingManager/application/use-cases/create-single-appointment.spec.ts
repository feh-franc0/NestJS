import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointment-repository'
import { Appointment } from '../../enterprise/entities/appointment'
import { CreateSingleAppointmentUseCase } from './create-single-appointment'
import { AlreadyExistsError } from './errors/already-exists-error'
import { InvalidDurationError } from './errors/invalid-duration-error'

describe('Create Single Appointment Use Case', () => {
  let appointmentRepository: InMemoryAppointmentRepository
  let sut: CreateSingleAppointmentUseCase

  beforeEach(() => {
    appointmentRepository = new InMemoryAppointmentRepository()
    sut = new CreateSingleAppointmentUseCase(appointmentRepository)
  })

  it('should be able to create a single appointment', async () => {
    // Arrange
    const request = {
      companyId: '1',
      patientId: '1',
      employeeId: '1',
      address: '123 Main St',
      startAppointmentTimestamp: new Date(2024, 1, 10, 13, 0).getTime(),
      durationInMinutes: 60,
      appointmentResultId: 'result-id',
      notes: 'This is a note',
    }

    // Act
    const result = await sut.execute(request)

    // Assert
    expect(result.isRight()).toBe(true)
    expect(appointmentRepository.appointments.length).toBe(1)
    expect(appointmentRepository.appointments[0]).toBeInstanceOf(Appointment)
  })

  it('should return an error when appointment already exists', async () => {
    // Arrange
    await sut.execute({
      companyId: '1',
      patientId: '1',
      employeeId: '1',
      address: '123 Main St',
      startAppointmentTimestamp: new Date(2024, 1, 10, 13, 0).getTime(),
      durationInMinutes: 60,
      appointmentResultId: 'result-id',
      notes: 'This is a note',
    })

    const request = {
      companyId: '1',
      patientId: '1',
      employeeId: '1',
      address: '123 Main St',
      startAppointmentTimestamp: new Date(2024, 1, 10, 13, 0).getTime(),
      durationInMinutes: 60,
      appointmentResultId: 'result-id',
      notes: 'This is a note',
    }

    // Act
    const result = await sut.execute(request)

    console.log('DB: ', appointmentRepository.appointments)

    // Assert
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
    expect(appointmentRepository.appointments.length).toBe(1)
  })

  it('should return an error when start time is after end time', async () => {
    // Arrange
    const request = {
      companyId: '1',
      patientId: '1',
      employeeId: '1',
      address: '123 Main St',
      startAppointmentTimestamp: new Date(2024, 1, 10, 13, 0).getTime(),
      durationInMinutes: -60, // Negative duration
      appointmentResultId: 'result-id',
      notes: 'This is a note',
    }

    // Act
    const result = await sut.execute(request)

    // Assert
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidDurationError)
    expect(appointmentRepository.appointments.length).toBe(0)
  })
})
