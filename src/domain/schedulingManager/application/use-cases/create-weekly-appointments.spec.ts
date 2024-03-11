import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointment-repository'
import { CreateWeeklyAppointmentsUseCase } from './create-weekly-appointments'
import { AlreadyExistsError } from './errors/already-exists-error'
import { InvalidTimestampOrderError } from './errors/invalid-timestamp-order-error'
import { InvalidDurationError } from './errors/invalid-duration-error'

describe('CreateWeeklyAppointmentsUseCase', () => {
  let sut: CreateWeeklyAppointmentsUseCase
  let repository: InMemoryAppointmentRepository

  beforeEach(() => {
    repository = new InMemoryAppointmentRepository()
    sut = new CreateWeeklyAppointmentsUseCase(repository)
  })

  it('should create weekly appointments', async () => {
    // Arrange

    // Act
    const result = await sut.execute({
      companyId: '1',
      patientId: '1',
      employeeId: '1',
      address: '123 Main St',
      scheduledDaysWeek: ['Monday', 'Wednesday'], // example days
      startContractTimeStamp: new Date(2024, 0, 1).getTime(), // Start date
      endContractTimeStamp: new Date(2024, 0, 31).getTime(), // End date
      durationInMinutes: 60,
      appointmentResultId: 'result-id',
      notes: 'This is a note',
    })

    // Assert
    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      const appointments = result.value.appointments
      expect(appointments.length).toBeGreaterThan(0)
      expect(repository.appointments.length).toBe(appointments.length)
    }
    // Additional assertions as needed
  })

  it('should return an error when appointment already exists', async () => {
    // Arrange
    await sut.execute({
      companyId: '1',
      patientId: '1',
      employeeId: '1',
      address: '123 Main St',
      scheduledDaysWeek: ['Monday', 'Wednesday'],
      startContractTimeStamp: new Date(2024, 0, 1).getTime(),
      endContractTimeStamp: new Date(2024, 0, 31).getTime(),
      durationInMinutes: 60,
      appointmentResultId: 'result-id',
      notes: 'This is a note',
    })

    // Act
    const result = await sut.execute({
      companyId: '1',
      patientId: '1',
      employeeId: '1',
      address: '123 Main St',
      scheduledDaysWeek: ['Monday', 'Wednesday'],
      startContractTimeStamp: new Date(2024, 0, 1).getTime(),
      endContractTimeStamp: new Date(2024, 0, 31).getTime(),
      durationInMinutes: 60,
      appointmentResultId: 'result-id',
      notes: 'This is a note',
    })

    // Assert
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
    expect(repository.appointments.length).toBe(10)
  })

  it('should return an error when start time is after end time', async () => {
    // Arrange

    // Act
    const result = await sut.execute({
      companyId: '1',
      patientId: '1',
      employeeId: '1',
      address: '123 Main St',
      scheduledDaysWeek: ['Monday', 'Wednesday'],
      startContractTimeStamp: new Date(2024, 0, 1).getTime(),
      endContractTimeStamp: new Date(2024, 0, 31).getTime(),
      durationInMinutes: -60, // Negative duration
      appointmentResultId: 'result-id',
      notes: 'This is a note',
    })

    // Assert
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidDurationError)
    expect(repository.appointments.length).toBe(0)
  })
})
