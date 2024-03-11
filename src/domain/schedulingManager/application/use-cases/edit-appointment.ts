import { Appointment } from '../../enterprise/entities/appointment'
import { AppointmentRepository } from '../repositories/appointment-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface EditAppointmentRequest {
  appointmentId: string
  appointment: Appointment
}

@Injectable()
export class EditAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    appointmentId,
    appointment,
  }: EditAppointmentRequest): Promise<void> {
    const existingAppointment =
      await this.appointmentRepository.getAppointmentById(appointmentId)

    if (!existingAppointment) {
      throw new ResourceNotFoundError()
    }

    // Update the appointment
    await this.appointmentRepository.editAppointment(appointmentId, appointment)
  }
}
