import { PaginationParams } from '@/core/repositories/pagination-params'
import { Employee } from '../../enterprise/entities/employee'

export interface EmployeeRepository {
  findById(id: string): Promise<Employee | null>
  findByEmail(email: string): Promise<Employee | null>
  fetchEmployees(params: PaginationParams): Promise<Employee[]>
  create(employee: Employee): Promise<void>
  edit(employee: Employee): Promise<void>
  delete(employee: Employee): Promise<void>
}
