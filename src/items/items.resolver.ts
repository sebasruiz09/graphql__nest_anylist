import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { ItemsService } from './items.service';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemService: ItemsService) {}
  @Mutation(() => Item, { name: 'createItem', description: 'create one item' })
  createItem(@Args('createItem') createItem: CreateItemInput): Promise<Item> {
    return this.itemService.create(createItem);
  }

  @Query(() => [Item], {
    name: 'findAll',
    description: 'select all items',
  })
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }
}
