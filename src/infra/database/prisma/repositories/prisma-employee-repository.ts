import { PaginationParams } from '@/core/repositories/pagination-params'
import { EmployeeRepository } from '@/domain/employeeManagement/application/repositories/employee-repository'
import { Employee } from '@/domain/employeeManagement/enterprise/entities/employee'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaEmployeeMapper } from '../mappers/prisma-employee-mapper'

@Injectable()
export class PrismaEmployeeRepository implements EmployeeRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Employee | null> {
    // ter a mesma entidade representada de formas diferentes dependendo da camada
    const employee = await this.prisma.employee.findUnique({
      where: {
        id,
      },
    })

    if (!employee) {
      return null
    }

    return PrismaEmployeeMapper.toDomain(employee)
  }

  async findByEmail(email: string): Promise<Employee | null> {
    const employee = await this.prisma.employee.findUnique({
      where: {
        email,
      },
    })

    if (!employee) {
      return null
    }

    return PrismaEmployeeMapper.toDomain(employee)
  }

  async fetchEmployees({ page }: PaginationParams): Promise<Employee[]> {
    const employee = await this.prisma.employee.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })

    return employee.map(PrismaEmployeeMapper.toDomain)
  }

  async create(employee: Employee): Promise<void> {
    const data = PrismaEmployeeMapper.toPrisma(employee)

    await this.prisma.employee.create({
      data,
    })
  }

  async edit(employee: Employee): Promise<void> {
    const data = PrismaEmployeeMapper.toPrisma(employee)

    await this.prisma.employee.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(employee: Employee): Promise<void> {
    const data = PrismaEmployeeMapper.toPrisma(employee)

    await this.prisma.employee.delete({
      where: {
        id: data.id,
      },
    })
  }
}
