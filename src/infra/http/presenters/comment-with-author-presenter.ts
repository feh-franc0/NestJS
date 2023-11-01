import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'

export class CommentWithAuthorPresenter {
  static toHTTP(CommentWithAuthor: CommentWithAuthor) {
    return {
      commentId: CommentWithAuthor.commentId.toString(),
      authorId: CommentWithAuthor.authorId.toString(),
      authorName: CommentWithAuthor.author,
      content: CommentWithAuthor.content,
      createdAt: CommentWithAuthor.createdAt,
      updatedAt: CommentWithAuthor.updateAt,
    }
  }
}
