import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreatePatientUseCase } from '@/domain/patientManagement/application/use-cases/create-patient'

const createPatientBodySchema = z.object({
  email: z.string(),
  name: z.string(),
  confirmPassword: z.string(),
  password: z.string(),
  attachments: z.array(z.string().uuid()),
})

const bodyValidationPipe = new ZodValidationPipe(createPatientBodySchema)

type CreatePatientBodySchema = z.infer<typeof createPatientBodySchema>

@Controller('/patients')
export class CreatePatientController {
  constructor(private createPatient: CreatePatientUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreatePatientBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { email, name, confirmPassword, password, attachments } = body
    const userId = user.sub

    const result = await this.createPatient.execute({
      companyId: userId,
      attachmentsIds: attachments,
      email,
      name,
      confirmPassword,
      password,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
