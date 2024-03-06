import { Either, right } from '@/core/either'
import { EmployeeRepository } from '../repositories/employee-repository'
import { Employee } from '../../enterprise/entities/employee'
import { Injectable } from '@nestjs/common'

interface FetchEmployeeUseCaseRequest {
  page: number
}

type FetchEmployeeUseCaseResponse = Either<
  null,
  {
    employees: Employee[]
  }
>

@Injectable()
export class FetchEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute({
    page,
  }: FetchEmployeeUseCaseRequest): Promise<FetchEmployeeUseCaseResponse> {
    const employees = await this.employeeRepository.fetchEmployees({ page })

    return right({
      employees,
    })
  }
}
