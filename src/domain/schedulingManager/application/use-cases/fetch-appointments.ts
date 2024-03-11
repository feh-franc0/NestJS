import { Appointment } from '../../enterprise/entities/appointment'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AppointmentRepository } from '../repositories/appointment-repository'

export interface FetchAppointmentsRequest {
  params: PaginationParams
}

export interface FetchAppointmentsResponse {
  appointments: Appointment[]
}

export class FetchAppointmentsUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    params,
  }: FetchAppointmentsRequest): Promise<FetchAppointmentsResponse> {
    const appointments =
      await this.appointmentRepository.getAppointmentPagination(params)

    return { appointments }
  }
}
