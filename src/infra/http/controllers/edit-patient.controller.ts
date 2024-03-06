import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { EditPatientUseCase } from '@/domain/patientManagement/application/use-cases/edit-patient'

const editPatientBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  attachments: z.array(z.string().uuid()),
})

const bodyValidationPipe = new ZodValidationPipe(editPatientBodySchema)

type EditPatientBodySchema = z.infer<typeof editPatientBodySchema>

@Controller('/patients/:id')
export class EditPatientController {
  constructor(private editPatient: EditPatientUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditPatientBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') patientId: string,
  ) {
    const { name, email, password, attachments } = body
    const userId = user.sub

    const result = await this.editPatient.execute({
      name,
      attachmentsIds: attachments,
      companyId: userId,
      email,
      password,
      patientId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
