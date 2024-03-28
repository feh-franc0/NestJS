import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Employee } from '@/domain/employeeManagement/enterprise/entities/employee'
import { Injectable } from '@nestjs/common'
import { EmployeeRepository } from '../repositories/employee-repository'
import { AppointmentRepository } from '@/domain/schedulingManager/application/repositories/appointment-repository'

interface FinishCurrentServiceUseCaseRequest {
  employeeId: string
  appointmentId: string
}

type FinishCurrentServiceUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    employee: Employee
  }
>

@Injectable()
export class FinishCurrentServiceUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private appointmentRepository: AppointmentRepository,
  ) {}

  async execute({
    employeeId,
    appointmentId,
  }: FinishCurrentServiceUseCaseRequest): Promise<FinishCurrentServiceUseCaseResponse> {
    const employee = await this.employeeRepository.findById(employeeId)

    if (!employee) {
      return left(new ResourceNotFoundError())
    }

    const appointment =
      await this.appointmentRepository.getAppointmentById(appointmentId)

    if (!appointment) {
      return left(new ResourceNotFoundError())
    }

    employee.currentServiceId = null

    await this.employeeRepository.edit(employee)

    return right({
      employee,
    })
  }
}
