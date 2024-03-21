import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Restriction, RestrictionProps } from './restriction'

export interface PatientRestrictionProps extends RestrictionProps {
  patientId: UniqueEntityID
}

export class PatientRestriction extends Restriction<PatientRestrictionProps> {
  get patientId() {
    return this.props.patientId
  }

  static create(
    props: Optional<PatientRestrictionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const patientRestriction = new PatientRestriction(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return patientRestriction
  }
}
