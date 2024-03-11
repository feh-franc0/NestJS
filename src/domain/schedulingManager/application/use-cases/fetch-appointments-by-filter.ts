import { Appointment } from '../../enterprise/entities/appointment'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AppointmentRepository } from '../repositories/appointment-repository'

export interface FetchAppointmentsByFilterRequest {
  startTime: Date
  endTime: Date
  params: PaginationParams
}

export interface FetchAppointmentsByFilterResponse {
  appointments: Appointment[]
}

export class FetchAppointmentsByFilterUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    startTime,
    endTime,
    params,
  }: FetchAppointmentsByFilterRequest): Promise<FetchAppointmentsByFilterResponse> {
    const appointments =
      await this.appointmentRepository.getAppointmentsByFilter(
        startTime,
        endTime,
        params,
      )

    return { appointments }
  }
}
