import { PaginationParams } from '@/core/repositories/pagination-params'
import { AppointmentRepository } from '@/domain/schedulingManager/application/repositories/appointment-repository'
import { Appointment } from '@/domain/schedulingManager/enterprise/entities/appointment'

export class InMemoryAppointmentRepository implements AppointmentRepository {
  public appointments: Appointment[] = []

  async getAppointmentPagination({ page }: PaginationParams) {
    const appointments = this.appointments.slice((page - 1) * 20, page * 20)

    return appointments
  }

  async createOneAppointment(appointment: Appointment): Promise<void> {
    this.appointments.push(appointment)
  }

  async createMultipleAppointments(appointments: Appointment[]): Promise<void> {
    this.appointments.push(...appointments)
    // console.log(appointments, this.appointments)
  }

  async getAppointmentsByFilter(
    startTime: Date,
    endTime: Date,
    { page }: PaginationParams,
  ): Promise<Appointment[]> {
    return this.appointments
      .filter(
        (appointment) =>
          appointment.startAppointmentTimestamp >= startTime.getTime() &&
          appointment.startAppointmentTimestamp <= endTime.getTime(),
      )
      .slice((page - 1) * 20, page * 20)
  }

  async getAppointmentByParameters(
    companyId: string,
    patientId: string,
    employeeId: string,
    startTimestamp: number,
  ): Promise<Appointment | null> {
    const existingAppointment = this.appointments.find(
      (appointment) =>
        appointment.companyId.toString() === companyId &&
        appointment.patientId.toString() === patientId &&
        appointment.employeeId.toString() === employeeId &&
        appointment.startAppointmentTimestamp === startTimestamp,
    )

    return existingAppointment || null
  }

  async getAppointmentById(appointmentId: string): Promise<Appointment | null> {
    const appointment = this.appointments.find(
      (appointment) => appointment.id.toString() === appointmentId,
    )
    return appointment || null
  }

  async editAppointment(
    appointmentId: string,
    appointment: Appointment,
  ): Promise<void> {
    const index = this.appointments.findIndex(
      (appointment) => appointment.id.toString() === appointmentId,
    )
    if (index !== -1) {
      this.appointments[index] = appointment
    }
  }

  async deleteAppointmentById(appointmentId: string): Promise<void> {
    this.appointments = this.appointments.filter(
      (appointment) => appointment.id.toString() !== appointmentId,
    )
  }

  async deleteAppointmentsByPatientAndEmployeeIdAndPeriod(
    patientId: string,
    employeeId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<void> {
    this.appointments = this.appointments.filter(
      (appointment) =>
        appointment.patientId.toString() === patientId &&
        appointment.employeeId.toString() === employeeId &&
        appointment.startAppointmentTimestamp >= startTime.getTime() &&
        appointment.startAppointmentTimestamp <= endTime.getTime(),
    )
  }
}
