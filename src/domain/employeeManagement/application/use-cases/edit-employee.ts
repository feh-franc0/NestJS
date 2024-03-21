import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { EmployeeRepository } from '../repositories/employee-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

interface EditEmployeeUseCaseRequest {
  companyId: string
  employeeId: string
  name: string
  email: string
  password: string
  department: string
  role: string
}

type EditEmployeeUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
>

@Injectable()
export class EditEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute({
    companyId,
    employeeId,
    name,
    email,
    password,
    department,
    role,
  }: EditEmployeeUseCaseRequest): Promise<EditEmployeeUseCaseResponse> {
    const employee = await this.employeeRepository.findById(employeeId)

    if (!employee) {
      return left(new ResourceNotFoundError())
    }

    if (companyId !== employee.companyId.toString()) {
      return left(new NotAllowedError())
    }

    employee.name = name
    employee.email = email
    employee.password = password
    employee.department = department
    employee.role = role

    await this.employeeRepository.edit(employee)

    return right({})
  }
}
