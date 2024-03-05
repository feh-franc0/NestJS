import { PatientAttachmentsRepository } from '@/domain/patientManagement/application/repositories/patient-attachments-repository'
import { PatientAttachment } from '@/domain/patientManagement/enterprise/entities/patient-attachment'

export class InMemoryPatientAttachmentsRepository
  implements PatientAttachmentsRepository
{
  public items: PatientAttachment[] = []

  async findManyByPatientId(patientId: string) {
    const patientAttachment = this.items.filter(
      (item) => item.patientId.toString() === patientId,
    )

    return patientAttachment
  }

  async deleteManyByPatientId(patientId: string) {
    const patientAttachment = this.items.filter(
      (item) => item.patientId.toString() !== patientId,
    )

    this.items = patientAttachment
  }
}
