import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Employee } from '@/domain/employeeManagement/enterprise/entities/employee'
import { Employee as PrismaEmployee, Prisma } from '@prisma/client'

export class PrismaEmployeeMapper {
  static toDomain(raw: PrismaEmployee): Employee {
    return Employee.create(
      {
        companyId: new UniqueEntityID(raw.id),
        email: raw.email,
        name: raw.name,
        password: '',
        department: '',
        role: '',
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(employee: Employee): Prisma.EmployeeUncheckedCreateInput {
    return {
      position: '',
      birthDate: '',
      name: employee.name,
      phoneNumber: '',
      id: employee.id.toString(),
      email: employee.email,
      address: '',
      gender: '',
      isActive: true,
      employeeCode: '123123',
      cpfDocuments: '123.123.123-12',
    }
  }
}
