import { PatientAttachmentsRepository } from '@/domain/patientManagement/application/repositories/patient-attachments-repository'
import { PatientAttachment } from '@/domain/patientManagement/enterprise/entities/patient-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaPatientAttachmentsRepository
  implements PatientAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByPatientId(patientId: string): Promise<PatientAttachment[]> {
    throw new Error('Method not implemented.')
  }

  async deleteManyByPatientId(patientId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
