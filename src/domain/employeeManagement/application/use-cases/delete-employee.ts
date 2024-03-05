import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { EmployeeRepository } from '../repositories/employee-repository'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteEmployeeUseCaseRequest {
  employeeId: string
  isCompany?: boolean
}

type DeleteEmployeeUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
>

export class DeleteEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute({
    employeeId,
    isCompany,
  }: DeleteEmployeeUseCaseRequest): Promise<DeleteEmployeeUseCaseResponse> {
    const employee = await this.employeeRepository.findById(employeeId)

    if (!employee) {
      return left(new ResourceNotFoundError())
    }

    if (!isCompany) {
      return left(new NotAllowedError())
    }

    await this.employeeRepository.delete(employee)

    return right({})
  }
}
