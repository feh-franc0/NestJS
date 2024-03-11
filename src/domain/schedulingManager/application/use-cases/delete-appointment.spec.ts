import { DeleteAppointmentUseCase } from './delete-appointment'
import { Appointment } from '../../enterprise/entities/appointment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointment-repository'

describe('DeleteAppointmentUseCase', () => {
  let useCase: DeleteAppointmentUseCase
  let repository: InMemoryAppointmentRepository

  beforeEach(() => {
    repository = new InMemoryAppointmentRepository()
    useCase = new DeleteAppointmentUseCase(repository)
  })

  it('should delete an existing appointment', async () => {
    // Arrange
    const existingAppointment = Appointment.create({
      companyId: new UniqueEntityID('1'),
      patientId: new UniqueEntityID('1'),
      employeeId: new UniqueEntityID('1'),
      address: '123 Main St',
      startAppointmentTimestamp: Date.now(),
      durationInMinutes: 30,
      appointmentResultId: 'result-id',
      type: 'HOURLY_INTERVAL',
    })
    await repository.createOneAppointment(existingAppointment)

    // Act
    await useCase.execute({ appointmentId: existingAppointment.id.toString() })

    // Assert
    const fetchedAppointment = await repository.getAppointmentById(
      existingAppointment.id.toString(),
    )
    expect(fetchedAppointment).toBeNull()
  })

  it('should throw an error when trying to delete a non-existing appointment', async () => {
    // Arrange
    const nonExistingAppointmentId = 'non-existing-id'

    // Act & Assert
    await expect(
      useCase.execute({ appointmentId: nonExistingAppointmentId }),
    ).rejects.toThrow('Appointment not found')
  })
})
