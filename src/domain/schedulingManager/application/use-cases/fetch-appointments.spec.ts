import { FetchAppointmentsUseCase } from './fetch-appointments'
import { Appointment } from '../../enterprise/entities/appointment'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointment-repository'

describe('FetchAppointmentsUseCase', () => {
  let useCase: FetchAppointmentsUseCase
  let repository: InMemoryAppointmentRepository

  beforeEach(() => {
    repository = new InMemoryAppointmentRepository()
    useCase = new FetchAppointmentsUseCase(repository)
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
      params,
    })

    // Assert
    expect(result.appointments.length).toBe(2)
    // Aqui vamos verificar se cada appointment esperado está presente nos appointments retornados
    // expectedAppointments.forEach((expectedAppointment) => {
    //   const foundAppointment = result.appointments.find(
    //     (appointment) => appointment.address === expectedAppointment.address,
    //   )
    //   expect(foundAppointment).toBeTruthy()
    //   expect(foundAppointment?.startAppointmentTimestamp).toBe(
    //     expectedAppointment.startAppointmentTimestamp,
    //   )
    //   expect(foundAppointment?.durationInMinutes).toBe(
    //     expectedAppointment.durationInMinutes,
    //   )
    //   // Adicione outras comparações de propriedades conforme necessário
    // })
  })
})
