import { PaginationParams } from '@/core/repositories/pagination-params'
import { Appointment } from '../../enterprise/entities/appointment'

export abstract class AppointmentRepository {
  abstract getAppointmentPagination(
    params: PaginationParams,
  ): Promise<Appointment[]>

  abstract createOneAppointment(appointment: Appointment): Promise<void>

  abstract createMultipleAppointments(
    appointments: Appointment[],
  ): Promise<void>

  abstract getAppointmentsByFilter(
    startTime: Date,
    endTime: Date,
    params: PaginationParams,
  ): Promise<Appointment[]>

  abstract getAppointmentByParameters(
    companyId: string,
    patientId: string,
    employeeId: string,
    startTimestamp: number,
  ): Promise<Appointment | null>

  abstract getAppointmentById(
    appointmentId: string,
  ): Promise<Appointment | null>

  abstract editAppointment(
    appointmentId: string,
    appointment: Appointment,
  ): Promise<void>

  abstract deleteAppointmentById(appointmentId: string): Promise<void>

  abstract deleteAppointmentsByPatientAndEmployeeIdAndPeriod(
    patientId: string,
    employeeId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<void>
}
