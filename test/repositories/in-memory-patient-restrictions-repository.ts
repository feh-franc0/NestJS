import { PaginationParams } from '@/core/repositories/pagination-params'
import { PatientRestrictionsRepository } from '@/domain/patientManagement/application/repositories/patient-restrictions-repository'
import { PatientRestriction } from '@/domain/patientManagement/enterprise/entities/patient-restriction'

export class InMemoryPatientRestrictionsRepository
  implements PatientRestrictionsRepository
{
  public items: PatientRestriction[] = []

  async findById(id: string) {
    const patientRestriction = this.items.find(
      (item) => item.id.toString() === id,
    )

    if (!patientRestriction) {
      return null
    }

    return patientRestriction
  }

  async findManyByPatientId(patientId: string, { page }: PaginationParams) {
    const patientRestrictions = this.items
      .filter((item) => item.patientId.toString() === patientId)
      .slice((page - 1) * 20, page * 20)

    return patientRestrictions
  }

  async create(patientRestriction: PatientRestriction) {
    this.items.push(patientRestriction)
  }

  async delete(patientRestriction: PatientRestriction) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === patientRestriction.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
