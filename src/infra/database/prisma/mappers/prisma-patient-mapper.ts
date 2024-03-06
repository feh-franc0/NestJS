import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Patient } from '@/domain/patientManagement/enterprise/entities/patient'
import { Patient as PrismaPatient, Prisma } from '@prisma/client'

export class PrismaPatientMapper {
  static toDomain(raw: PrismaPatient): Patient {
    return Patient.create(
      {
        companyId: new UniqueEntityID(raw.companyId),
        email: raw.email,
        name: raw.elderlyName,
        password: '',
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(patient: Patient): Prisma.PatientUncheckedCreateInput {
    return {
      id: patient.id.toString(),
      companyId: patient.companyId.toString(),
      email: patient.email,
      elderlyName: patient.name,
      address: '',
      gender: '',
      insurance: '',
      isActive: true,
      lastAppointment: '',
      patientCode: '123123',
      relativeName: '',
      cpfDocuments: '123.123.123-12',
    }
  }
}
