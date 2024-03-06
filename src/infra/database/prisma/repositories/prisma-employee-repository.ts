import { PaginationParams } from '@/core/repositories/pagination-params'
import { EmployeeRepository } from '@/domain/employeeManagement/application/repositories/employee-repository'
import { Employee } from '@/domain/employeeManagement/enterprise/entities/employee'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaEmployeeRepository implements EmployeeRepository {
  findById(id: string): Promise<Employee | null> {
    throw new Error('Method not implemented.')
  }

  findByEmail(email: string): Promise<Employee | null> {
    throw new Error('Method not implemented.')
  }

  fetchEmployees(params: PaginationParams): Promise<Employee[]> {
    throw new Error('Method not implemented.')
  }

  create(employee: Employee): Promise<void> {
    throw new Error('Method not implemented.')
  }

  edit(employee: Employee): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(employee: Employee): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
