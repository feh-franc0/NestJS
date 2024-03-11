import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PatientRepository } from '../repositories/patient-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { PatientAttachmentsRepository } from '../repositories/patient-attachments-repository'
import { PatientAttachmentList } from '../../enterprise/entities/patient-attachment-list'
import { PatientAttachment } from '../../enterprise/entities/patient-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'

interface EditPatientUseCaseRequest {
  companyId: string
  patientId: string
  name: string
  email: string
  password: string
  attachmentsIds: string[]
}

type EditPatientUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
>

@Injectable()
export class EditPatientUseCase {
  constructor(
    private patientRepository: PatientRepository,
    private patientAttachmentsRepository: PatientAttachmentsRepository,
  ) {}

  async execute({
    companyId,
    patientId,
    name,
    email,
    password,
    attachmentsIds,
  }: EditPatientUseCaseRequest): Promise<EditPatientUseCaseResponse> {
    const patient = await this.patientRepository.findById(patientId)

    if (!patient) {
      return left(new ResourceNotFoundError())
    }

    // if (companyId !== patient.companyId.toString()) {
    //   return left(new NotAllowedError())
    // }

    // const currentPatientAttachments =
    //   await this.patientAttachmentsRepository.findManyByPatientId(patientId)

    // const patientAttachmentList = new PatientAttachmentList(
    //   currentPatientAttachments,
    // )

    // const patientAttachments = attachmentsIds.map((attachmentId) => {
    //   return PatientAttachment.create({
    //     attachmentId: new UniqueEntityID(attachmentId),
    //     patientId: patient.id,
    //   })
    // })

    // patientAttachmentList.update(patientAttachments)

    patient.name = name
    patient.email = email
    patient.password = password
    // patient.attachments = patientAttachmentList

    await this.patientRepository.edit(patient)

    return right({})
  }
}
