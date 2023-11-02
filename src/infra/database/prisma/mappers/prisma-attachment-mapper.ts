import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class PrismaAttachmentMapper {
  static toDomain(raw: PrismaAttachment): Attachment {
    return Attachment.create(
      {
        title: raw.title,
        url: raw.url,
      },
      new UniqueEntityID(raw.id),
    )
  }

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
