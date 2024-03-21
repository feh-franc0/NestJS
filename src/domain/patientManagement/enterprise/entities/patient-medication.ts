import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Medication, MedicationProps } from './medication'

export interface PatientMedicationProps extends MedicationProps {
  patientId: UniqueEntityID
}

export class PatientMedication extends Medication<PatientMedicationProps> {
  get patientId() {
    return this.props.patientId
  }

  static create(
    props: Optional<PatientMedicationProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const patientMedication = new PatientMedication(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return patientMedication
  }
}
