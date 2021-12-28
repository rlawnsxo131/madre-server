import { IResolvers } from '@graphql-tools/utils';
import { userService, userValidationService } from '..';
import ApolloCustomError from '../../../lib/ApolloCustomError';
import { GetUserParams } from '../interface/user.interface';

const userResolvers: IResolvers = {
  User: {},
  Query: {
    async user(_, { id }: GetUserParams) {
      userValidationService.getUserParamsValidation(id);
      const user = await userService.findOne(id);
      if (!user) {
        throw new ApolloCustomError({
          message: 'Not Found User',
          code: 'BAD_REQUEST',
          extensions: { id },
        });
      }
      return user;
    },
  },
  Mutation: {},
};

export default userResolvers;
