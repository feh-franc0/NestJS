import { PaginationParams } from '@/core/repositories/pagination-params'
import { PatientRepository } from '@/domain/patientManagement/application/repositories/patient-repository'
import { Patient } from '@/domain/patientManagement/enterprise/entities/patient'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaPatientMapper } from '../mappers/prisma-patient-mapper'

@Injectable()
export class PrismaPatientRepository implements PatientRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Patient | null> {
    // ter a mesma entidade representada de formas diferentes dependendo da camada
    const patient = await this.prisma.patient.findUnique({
      where: {
        id,
      },
    })

    if (!patient) {
      return null
    }

    return PrismaPatientMapper.toDomain(patient)
  }

  async findByEmail(email: string): Promise<Patient | null> {
    const patient = await this.prisma.patient.findUnique({
      where: {
        email,
      },
    })

    if (!patient) {
      return null
    }

    return PrismaPatientMapper.toDomain(patient)
  }

  async fetchPatients({ page }: PaginationParams): Promise<Patient[]> {
    const patient = await this.prisma.patient.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })

    return patient.map(PrismaPatientMapper.toDomain)
  }

  async create(patient: Patient): Promise<void> {
    const data = PrismaPatientMapper.toPrisma(patient)

    await this.prisma.patient.create({
      data,
    })
  }

  async edit(patient: Patient): Promise<void> {
    const data = PrismaPatientMapper.toPrisma(patient)

    await this.prisma.patient.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(patient: Patient): Promise<void> {
    const data = PrismaPatientMapper.toPrisma(patient)

    await this.prisma.patient.delete({
      where: {
        id: data.id,
      },
    })
  }
}
