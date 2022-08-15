import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Auth0AccessTokenPayload, CurrentUser } from '~/auth';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'usersFindById' })
  findById(@Args('_id', { type: () => ID }) _id: string) {
    return this.usersService.findOne(_id);
  }

  @Mutation(() => User)
  usersFindOrCreate(
    @Args('input') createUserInput: CreateUserInput,
    @CurrentUser() currentUser: Auth0AccessTokenPayload
  ) {
    if (createUserInput._id !== currentUser.sub)
      throw new UnauthorizedException();
    return this.usersService.findOrCreate(createUserInput);
  }

  @Mutation(() => User)
  usersUpdateOne(
    @Args('input') updateUserInput: UpdateUserInput,
    @CurrentUser() currentUser: Auth0AccessTokenPayload
  ) {
    if (updateUserInput._id !== currentUser.sub)
      throw new UnauthorizedException();
    return this.usersService.update(updateUserInput._id, updateUserInput);
  }

  @Mutation(() => User)
  usersRemoveOne(
    @Args('_id', { type: () => ID }) _id: string,
    @CurrentUser() currentUser: User
  ) {
    if (_id !== currentUser._id) throw new UnauthorizedException();
    return this.usersService.remove(_id);
  }
}
