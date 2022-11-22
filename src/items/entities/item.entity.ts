import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// *typeOrm entities and GraphQl types can coexist together
@Entity({ name: 'items' })
@ObjectType()
export class Item {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  // !declaration of a unique identifier in GraphQl
  @Field(() => ID, {
    name: 'id',
    nullable: true,
  })
  id?: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  // *as a good practice it is recommended to make the name explicit.
  @Field(() => String, {
    name: 'name',
  })
  name: string;

  @Column({
    name: 'quantity',
    type: 'integer',
    nullable: false,
  })
  @Field(() => String, {
    name: 'quantity',
  })
  quantity: number;

  @Column({
    name: 'quantity_units',
    type: 'integer',
    nullable: false,
  })
  @Field(() => String, {
    name: 'quantity_units',
  })
  quantity_units: number;
}
