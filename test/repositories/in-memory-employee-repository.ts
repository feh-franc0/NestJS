import { PaginationParams } from '@/core/repositories/pagination-params'
import { EmployeeRepository } from '@/domain/employeeManagement/application/repositories/employee-repository'
import { Employee } from '@/domain/employeeManagement/enterprise/entities/employee'

export class InMemoryEmployeeRepository implements EmployeeRepository {
  public items: Employee[] = []

  async findById(id: string) {
    const employee = this.items.find((item) => item.id.toString() === id)

    if (!employee) {
      return null
    }

    return employee
  }

  async findByEmail(email: string) {
    const employee = this.items.find((item) => item.email.toString() === email)

    if (!employee) {
      return null
    }

    return employee
  }

  async fetchEmployees({ page }: PaginationParams) {
    const employees = this.items.slice((page - 1) * 20, page * 20)

    return employees
  }

  async create(employee: Employee) {
    this.items.push(employee)
  }

  async edit(employee: Employee) {
    const itemIndex = this.items.findIndex((item) => item.id === employee.id)

    this.items[itemIndex] = employee
  }

  async delete(employee: Employee) {
    const itemIndex = this.items.findIndex((item) => item.id === employee.id)

    this.items.splice(itemIndex, 1)
  }
}
