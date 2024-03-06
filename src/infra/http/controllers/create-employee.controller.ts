import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateEmployeeUseCase } from '@/domain/employeeManagement/application/use-cases/create-employee'

const createEmployeeBodySchema = z.object({
  email: z.string(),
  name: z.string(),
  department: z.string(),
  role: z.string(),
  confirmPassword: z.string(),
  password: z.string(),
  // attachments: z.array(z.string().uuid()),
})

const bodyValidationPipe = new ZodValidationPipe(createEmployeeBodySchema)

type CreateEmployeeBodySchema = z.infer<typeof createEmployeeBodySchema>

@Controller('/employees')
export class CreateEmployeeController {
  constructor(private createEmployee: CreateEmployeeUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateEmployeeBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { email, name, confirmPassword, password, department, role } = body
    const userId = user.sub

    const result = await this.createEmployee.execute({
      companyId: userId,
      email,
      department,
      role,
      name,
      confirmPassword,
      password,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
