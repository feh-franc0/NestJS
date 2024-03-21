import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface IProps {
  type: 'ALLERGY' | 'RESTRICTION'
}

export interface RestrictionProps {
  patientId: UniqueEntityID
  name: string
  type: IProps
  createdAt: Date
  updatedAt?: Date | null
}

export abstract class Restriction<
  Props extends RestrictionProps,
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

  set type(type: IProps) {
    this.props.type = type
    this.touch()
  }
}
