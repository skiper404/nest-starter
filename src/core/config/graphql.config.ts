import { ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'

import { GqlContext } from '@/src/shared/types/gql-context.types'

export function getGraphqlConfig(
  configService: ConfigService
): ApolloDriverConfig {
  return {
    playground: configService.getOrThrow<string>('NODE_ENV') === 'development',
    path: configService.getOrThrow<string>('GRAPHQL_PREFIX'),
    autoSchemaFile: join(process.cwd(), 'src/core/graphql/schema.gql'),
    sortSchema: true,
    context: ({ req, res }: GqlContext) => ({ req, res }),
    installSubscriptionHandlers: true
  }
}
