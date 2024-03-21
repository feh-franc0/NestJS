import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface IType {
  type: 'DROP' | 'PILL'
}

export interface MedicationProps {
  patientId: UniqueEntityID
  name: string
  type: IType
  dose: string
  timing: string
  createdAt: Date
  updatedAt?: Date | null
}

export abstract class Medication<
  Props extends MedicationProps,
> extends Entity<Props> {
  get patientId() {
    return this.props.patientId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get type() {
    return this.props.type
  }

  set type(type: IType) {
    this.props.type = type
    this.touch()
  }

  get dose() {
    return this.props.dose
  }

  set dose(dose: string) {
    this.props.dose = dose
    this.touch()
  }

  get timing() {
    return this.props.timing
  }

  set timing(timing: string) {
    this.props.timing = timing
    this.touch()
  }
}
