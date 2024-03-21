import { PaginationParams } from '@/core/repositories/pagination-params'
import { PatientAppointmentsRepository } from '@/domain/patientManagement/application/repositories/patient-appointment-repository'
import { PatientAppointment } from '@/domain/patientManagement/enterprise/entities/patient-appointments'

export class InMemoryPatientAppointmentsRepository
  implements PatientAppointmentsRepository
{
  public items: PatientAppointment[] = []

  async findById(id: string) {
    const patientAppointment = this.items.find(
      (item) => item.id.toString() === id,
    )

    if (!patientAppointment) {
      return null
    }

    return patientAppointment
  }

  async findManyByPatientId(patientId: string, { page }: PaginationParams) {
    const patientAppointments = this.items
      .filter((item) => item.patientId.toString() === patientId)
      .slice((page - 1) * 20, page * 20)

    return patientAppointments
  }

  async create(patientAppointment: PatientAppointment) {
    this.items.push(patientAppointment)
  }

  async delete(patientAppointment: PatientAppointment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === patientAppointment.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
