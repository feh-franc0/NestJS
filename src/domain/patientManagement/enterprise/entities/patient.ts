import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { PatientAttachmentList } from './patient-attachment-list'

export interface PatientProps {
  companyId: UniqueEntityID
  name: string
  email: string
  password: string
  attachments: PatientAttachmentList
}

export class Patient extends Entity<PatientProps> {
  get companyId() {
    return this.props.companyId
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

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: PatientAttachmentList) {
    this.props.attachments = attachments
  }

  static create(
    props: Optional<PatientProps, 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const patient = new Patient(
      {
        ...props,
        attachments: props.attachments ?? new PatientAttachmentList(),
      },
      id,
    )

    return patient
  }
}

// model Patient {
//   id                    String                 @id @default(uuid())
//   companyId             String
//   // company               Company                @relation(fields: [companyId], references: [id])
//   isActive              Boolean
//   comorbidityTypes      String[]
//   relativeName          String
//   elderlyName           String
//   address               String
//   importantPhones       String[]
//   email                 String                 @unique
//   medicationDoseTiming  Medication[]
//   allergiesRestrictions AlergiesRestrictions[]
//   cpfDocuments          String
//   pdfPhotoFiles         String[]
//   patientCode           String
//   gender                String
//   lastAppointment       String
//   insurance             String
//   Appointments          Appointment[]

//   @@map("Patients")
// }
