import { AppointmentRepository } from '../repositories/appointment-repository'

export interface DeleteAppointmentRequest {
  appointmentId: string
}

export class DeleteAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({ appointmentId }: DeleteAppointmentRequest): Promise<void> {
    const existingAppointment =
      await this.appointmentRepository.getAppointmentById(appointmentId)
    if (!existingAppointment) {
      throw new Error('Appointment not found')
    }
    await this.appointmentRepository.deleteAppointmentById(appointmentId)
  }
}
