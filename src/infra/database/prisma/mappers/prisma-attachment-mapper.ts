import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { Prisma } from '@prisma/client'

export class PrismaAttachmentMapper {
  static toPrisma(
    attachemnt: Attachment,
  ): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachemnt.id.toString(),
      title: attachemnt.title,
      url: attachemnt.url,
    }
  }
}
