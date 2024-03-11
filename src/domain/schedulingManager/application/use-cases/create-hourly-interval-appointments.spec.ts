import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointment-repository'
import { CreateHourlyIntervalAppointmentsUseCase } from './create-hourly-interval-appointments'
import { AlreadyExistsError } from './errors/already-exists-error'
import { InvalidTimestampOrderError } from './errors/invalid-timestamp-order-error'
import { Appointment } from '../../enterprise/entities/appointment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

describe('CreateHourlyIntervalAppointmentsUseCase', () => {
  let sut: CreateHourlyIntervalAppointmentsUseCase
  let repository: InMemoryAppointmentRepository

  beforeEach(() => {
    repository = new InMemoryAppointmentRepository()
    sut = new CreateHourlyIntervalAppointmentsUseCase(repository)
  })

  it('should create hourly interval appointments for work days', async () => {
    // Act
    const result = await sut.execute({
      companyId: '1',
      patientId: '1',
      employeeId: '1',
      address: '123 Main St',
      startContractTimeStamp: new Date(2024, 0, 1).getTime(), // Start date
      endContractTimeStamp: new Date(2024, 1, 2).getTime(), // End date (last day of the month)
      workDays: 1,
      restDays: 2,
      appointmentResultId: 'result-id',
      notes: 'This is a note',
    })

    // Assert
    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      const appointments = result.value.appointments
      expect(appointments.length).toBe(11) // Expecting 20 appointments for the work days
    }
  })

  it('should return an error when appointment already exists', async () => {
    // Arrange
    await repository.createOneAppointment(
      Appointment.create({
        companyId: new UniqueEntityID('1'),
        patientId: new UniqueEntityID('1'),
        employeeId: new UniqueEntityID('1'),
        address: '123 Main St',
        startAppointmentTimestamp: new Date(2024, 0, 1).getTime(),
        durationInMinutes: 30,
        appointmentResultId: 'result-id',
        type: 'HOURLY_INTERVAL',
      }),
    )

    const request = {
      companyId: '1',
      patientId: '1',
      employeeId: '1',
      address: '123 Main St',
      startContractTimeStamp: new Date(2024, 0, 1).getTime(),
      endContractTimeStamp: new Date(2024, 0, 1).getTime(), // End date (same as start date)
      workDays: 1,
      restDays: 2,
      appointmentResultId: 'result-id',
      notes: 'This is a note',
    }

    // Act
    const result = await sut.execute(request)

    // Assert
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
    expect(repository.appointments.length).toBe(1)
  })

  it('should return an error when start time is after end time', async () => {
    // Arrange
    const request = {
      companyId: '1',
      patientId: '1',
      employeeId: '1',
      address: '123 Main St',
      startContractTimeStamp: new Date(2024, 0, 31).getTime(), // End date before start date
      endContractTimeStamp: new Date(2024, 0, 1).getTime(), // Start date (after end date)
      workDays: 1,
      restDays: 2,
      appointmentResultId: 'result-id',
      notes: 'This is a note',
    }

    // Act
    const result = await sut.execute(request)

    // Assert
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidTimestampOrderError)
    expect(repository.appointments.length).toBe(0)
  })
})
