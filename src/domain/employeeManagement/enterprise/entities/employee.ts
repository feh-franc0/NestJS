import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface EmployeeProps {
  companyId: UniqueEntityID
  currentServiceId?: UniqueEntityID | null
  name: string
  email: string
  password: string
  department: string
  role: string
  createdAt: Date
}

// * funcionário
export class Employee extends Entity<EmployeeProps> {
  get companyId() {
    return this.props.companyId
  }

  get currentServiceId() {
    return this.props.currentServiceId
  }

  set currentServiceId(currentServiceId: UniqueEntityID | undefined | null) {
    this.props.currentServiceId = currentServiceId
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get department() {
    return this.props.department
  }

  set department(department: string) {
    this.props.department = department
  }

  get role() {
    return this.props.role
  }

  set role(role: string) {
    this.props.role = role
  }

  static create(
    props: Optional<EmployeeProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const employee = new Employee({ ...props, createdAt: new Date() }, id)

    return employee
  }
}
