import { Field, ID, ObjectType } from '@nestjs/graphql'

import { User } from '@/prisma/generated/client'

@ObjectType()
export class UserModel implements User {
  @Field(() => ID)
  public id: string

  @Field(() => String)
  public name: string

  @Field(() => String)
  public age: string
}
