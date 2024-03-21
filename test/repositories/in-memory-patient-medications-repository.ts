import { PaginationParams } from '@/core/repositories/pagination-params'
import { PatientMedicationsRepository } from '@/domain/patientManagement/application/repositories/patient-medications-repository'
import { PatientMedication } from '@/domain/patientManagement/enterprise/entities/patient-medication'

export class InMemoryPatientMedicationsRepository
  implements PatientMedicationsRepository
{
  public items: PatientMedication[] = []

  async findById(id: string) {
    const patientMedication = this.items.find(
      (item) => item.id.toString() === id,
    )

    if (!patientMedication) {
      return null
    }

    return patientMedication
  }

  async findManyByPatientId(patientId: string, { page }: PaginationParams) {
    const patientMedications = this.items
      .filter((item) => item.patientId.toString() === patientId)
      .slice((page - 1) * 20, page * 20)

    return patientMedications
  }

  async create(patientMedication: PatientMedication) {
    this.items.push(patientMedication)
  }

  async delete(patientMedication: PatientMedication) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === patientMedication.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
