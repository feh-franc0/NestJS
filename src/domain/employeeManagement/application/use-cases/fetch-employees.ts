import { Either, right } from '@/core/either'
import { EmployeeRepository } from '../repositories/employee-repository'
import { Employee } from '../../enterprise/entities/employee'

interface CreateEmployeeUseCaseRequest {
  page: number
}

type CreateEmployeeUseCaseResponse = Either<
  null,
  {
    employees: Employee[]
  }
>

export class CreateEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute({
    page,
  }: CreateEmployeeUseCaseRequest): Promise<CreateEmployeeUseCaseResponse> {
    const employees = await this.employeeRepository.fetchEmployees({ page })

    return right({
      employees,
    })
  }
}
