import { Either, left, right } from '@/core/either'
import { EmployeeRepository } from '../repositories/employee-repository'
import { AlreadyExistsError } from './errors/already-exists-error'
import { Employee } from '../../enterprise/entities/employee'
import { PasswordMismatchError } from './errors/password-mismatch-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'

interface CreateEmployeeUseCaseRequest {
  companyId: string
  name: string
  department: string
  role: string
  // ? a empresa cria conta, coloca o email do funcionario e uma senha qualquer, assim o fucionario pode mudar a senha, sendo enviado para ele um email de modificacao de senha
  email: string
  password: string //! talvez eu remova a senha, a empresa cria a conta sem senha e o funcionario tem que cria-la logo em seguida verificando o email.
  confirmPassword: string
}

type CreateEmployeeUseCaseResponse = Either<
  AlreadyExistsError | PasswordMismatchError,
  {
    employee: Employee
  }
>

@Injectable()
export class CreateEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute({
    companyId,
    name,
    email,
    department,
    role,
    password,
    confirmPassword,
  }: CreateEmployeeUseCaseRequest): Promise<CreateEmployeeUseCaseResponse> {
    const employeeAlreadyExists =
      await this.employeeRepository.findByEmail(email)

    if (employeeAlreadyExists) {
      return left(new AlreadyExistsError())
    }

    if (password !== confirmPassword) {
      return left(new PasswordMismatchError())
    }

    const employee = Employee.create({
      companyId: new UniqueEntityID(companyId),
      name,
      email,
      password,
      department,
      role,
    })

    await this.employeeRepository.create(employee)

    return right({
      employee,
    })
  }
}
