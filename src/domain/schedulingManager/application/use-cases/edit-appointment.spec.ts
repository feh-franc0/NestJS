import { Appointment } from '../../enterprise/entities/appointment'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { EditAppointmentUseCase } from './edit-appointment'
import { InMemoryAppointmentRepository } from 'test/repositories/in-memory-appointment-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

describe('EditAppointmentUseCase', () => {
  let useCase: EditAppointmentUseCase
  let repository: InMemoryAppointmentRepository

  beforeEach(() => {
    repository = new InMemoryAppointmentRepository()
    useCase = new EditAppointmentUseCase(repository)
  })

  it('should create and then edit an appointment', async () => {
    // Arrange: Create a new appointment
    const initialAppointment = Appointment.create({
      companyId: new UniqueEntityID('company-1'),
      patientId: new UniqueEntityID('patient-1'),
      employeeId: new UniqueEntityID('employee-1'),
      address: '123 Main St',
      startAppointmentTimestamp: Date.now(),
      durationInMinutes: 60,
      appointmentResultId: 'result-1',
      type: 'SINGLE',
    })

    // Create the appointment
    await repository.createOneAppointment(initialAppointment)

    const updatedAppointment = Appointment.create({
      companyId: new UniqueEntityID('company-1'),
      patientId: new UniqueEntityID('patient-1'),
      employeeId: new UniqueEntityID('employee-1'),
      address: 'updated address',
      startAppointmentTimestamp: Date.now(),
      durationInMinutes: 60,
      appointmentResultId: 'result-1',
      type: 'SINGLE',
    })

    // Act: Execute the use case
    await useCase.execute({
      appointmentId: initialAppointment.id.toString(),
      appointment: updatedAppointment,
    })

    // Assert: Check if the appointment was updated
    const editedAppointment = await repository.getAppointmentById(
      updatedAppointment.id.toString(),
    )

    expect(editedAppointment).toEqual(updatedAppointment)
  })

  it('should throw ResourceNotFoundError if appointment does not exist', async () => {
    // Arrange
    const nonExistentAppointmentId = 'non-existent-id'
    const updatedAppointment = Appointment.create({
      companyId: new UniqueEntityID('company-1'),
      patientId: new UniqueEntityID('patient-1'),
      employeeId: new UniqueEntityID('employee-1'),
      address: '123 Main St',
      startAppointmentTimestamp: Date.now(),
      durationInMinutes: 60,
      appointmentResultId: 'result-1',
      type: 'SINGLE',
    })

    // Act & Assert
    await expect(
      useCase.execute({
        appointmentId: nonExistentAppointmentId,
        appointment: updatedAppointment,
      }),
    ).rejects.toThrow(ResourceNotFoundError)
  })
})
