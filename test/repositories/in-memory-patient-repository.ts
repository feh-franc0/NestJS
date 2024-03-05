import { PaginationParams } from '@/core/repositories/pagination-params'
import { PatientAttachmentsRepository } from '@/domain/patientManagement/application/repositories/patient-attachments-repository'
import { PatientRepository } from '@/domain/patientManagement/application/repositories/patient-repository'
import { Patient } from '@/domain/patientManagement/enterprise/entities/patient'

export class InMemoryPatientRepository implements PatientRepository {
  public items: Patient[] = []

  constructor(
    private patientAttachmentsRepository: PatientAttachmentsRepository,
  ) {}

  async findById(id: string) {
    const patient = this.items.find((item) => item.id.toString() === id)

    if (!patient) {
      return null
    }

    return patient
  }

  async findByEmail(email: string) {
    const patient = this.items.find((item) => item.email.toString() === email)

    if (!patient) {
      return null
    }

    return patient
  }

  async fetchPatients({ page }: PaginationParams) {
    const patients = this.items.slice((page - 1) * 20, page * 20)

    return patients
  }

  async create(patient: Patient) {
    this.items.push(patient)
  }

  async edit(patient: Patient) {
    const itemIndex = this.items.findIndex((item) => item.id === patient.id)

    this.items[itemIndex] = patient
  }

  async delete(patient: Patient) {
    const itemIndex = this.items.findIndex((item) => item.id === patient.id)

    this.items.splice(itemIndex, 1)

    this.patientAttachmentsRepository.deleteManyByPatientId(
      patient.id.toString(),
    )
  }
}
