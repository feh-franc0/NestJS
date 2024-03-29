import { Either, left, right } from '@/core/either'
import { PatientsRepository } from '../repositories/patient-repository'
import { AlreadyExistsError } from './errors/already-exists-error'
import { Patient } from '../../enterprise/entities/patient'
import { PasswordMismatchError } from './errors/password-mismatch-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PatientAttachment } from '../../enterprise/entities/patient-attachment'
import { PatientAttachmentList } from '../../enterprise/entities/patient-attachment-list'
import { Injectable } from '@nestjs/common'

interface CreatePatientUseCaseRequest {
  companyId: string
  name: string
  // ? a empresa cria conta, coloca o email do funcionario e uma senha qualquer, assim o fucionario pode mudar a senha, sendo enviado para ele um email de modificacao de senha
  email: string
  password: string //! talvez eu remova a senha, a empresa cria a conta sem senha e o funcionario tem que cria-la logo em seguida verificando o email.
  confirmPassword: string
  attachmentsIds: string[]
}

type CreatePatientUseCaseResponse = Either<
  AlreadyExistsError | PasswordMismatchError,
  {
    patient: Patient
  }
>

@Injectable()
export class CreatePatientUseCase {
  constructor(private patientsRepository: PatientsRepository) {}

  async execute({
    companyId,
    name,
    email,
    password,
    confirmPassword,
    attachmentsIds,
  }: CreatePatientUseCaseRequest): Promise<CreatePatientUseCaseResponse> {
    const patientAlreadyExists =
      await this.patientsRepository.findByEmail(email)

    if (patientAlreadyExists) {
      return left(new AlreadyExistsError())
    }

    if (password !== confirmPassword) {
      return left(new PasswordMismatchError())
    }

    const patient = Patient.create({
      companyId: new UniqueEntityID(companyId),
      name,
      email,
      password,
    })

    const patientAttachments = attachmentsIds.map((attachmentId) => {
      return PatientAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        patientId: patient.id,
      })
    })

    patient.attachments = new PatientAttachmentList(patientAttachments)

    await this.patientsRepository.create(patient)

    return right({
      patient,
    })
  }
}
