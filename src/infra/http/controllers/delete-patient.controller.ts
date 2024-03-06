import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { DeletePatientUseCase } from '@/domain/patientManagement/application/use-cases/delete-patient'

@Controller('/patients/:id')
export class DeletePatientController {
  constructor(private deletePatient: DeletePatientUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') patientId: string,
  ) {
    const userId = user.sub

    const result = await this.deletePatient.execute({
      patientId,
      isCompany: true,
      // authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
