import { FetchAppointmentsByFilterUseCase } from './fetch-appointments-by-filter'
import { Appointment } from '../../enterprise/entities/appointment'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointment-repository'

describe('FetchAppointmentsByFilterUseCase', () => {
  let useCase: FetchAppointmentsByFilterUseCase
  let repository: InMemoryAppointmentRepository

  beforeEach(() => {
    repository = new InMemoryAppointmentRepository()
    useCase = new FetchAppointmentsByFilterUseCase(repository)
  })

  it('should fetch appointments within a specific time range', async () => {
    // Arrange
    const startTime = new Date(2024, 0, 1)
    const endTime = new Date(2024, 0, 31)
    const params: PaginationParams = {
      page: 1,
    }

    await repository.createMultipleAppointments([
      Appointment.create({
        companyId: new UniqueEntityID('1'),
        patientId: new UniqueEntityID('1'),
        employeeId: new UniqueEntityID('1'),
        address: '123 Main St',
        startAppointmentTimestamp: startTime.getTime(),
        durationInMinutes: 30,
        appointmentResultId: 'result-id',
        type: 'HOURLY_INTERVAL',
      }),
      Appointment.create({
        companyId: new UniqueEntityID('2'),
        patientId: new UniqueEntityID('2'),
        employeeId: new UniqueEntityID('2'),
        address: '456 Elm St',
        startAppointmentTimestamp: startTime.getTime(),
        durationInMinutes: 60,
        appointmentResultId: 'result-id-2',
        type: 'SINGLE',
      }),
    ])

    // Act
    const result = await useCase.execute({
      startTime,
      endTime,
      params,
    })

    // Assert
    expect(result.appointments.length).toBe(2)
    // Aqui vamos verificar se cada appointment esperado está presente nos appointments retornados
    result.appointments.forEach((appointment) => {
      expect(appointment.startAppointmentTimestamp).toBeGreaterThanOrEqual(
        startTime.getTime(),
      )
      expect(appointment.startAppointmentTimestamp).toBeLessThanOrEqual(
        endTime.getTime(),
      )
    })
  })
})
