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
import { EditEmployeeUseCase } from '@/domain/employeeManagement/application/use-cases/edit-employee'

const editEmployeeBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  department: z.string(),
  role: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editEmployeeBodySchema)

type EditEmployeeBodySchema = z.infer<typeof editEmployeeBodySchema>

@Controller('/employees/:id')
export class EditEmployeeController {
  constructor(private editEmployee: EditEmployeeUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditEmployeeBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') employeeId: string,
  ) {
    const { department, email, name, password, role } = body
    const userId = user.sub

    const result = await this.editEmployee.execute({
      companyId: userId,
      department,
      email,
      employeeId,
      name,
      password,
      role,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
