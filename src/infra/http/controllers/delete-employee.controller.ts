import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { DeleteEmployeeUseCase } from '@/domain/employeeManagement/application/use-cases/delete-employee'

@Controller('/employees/:id')
export class DeleteEmployeeController {
  constructor(private deleteEmployee: DeleteEmployeeUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') employeeId: string,
  ) {
    const userId = user.sub

    const result = await this.deleteEmployee.execute({
      employeeId,
      isCompany: true,
      // authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
