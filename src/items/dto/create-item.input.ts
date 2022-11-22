import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

//! define entries for the body of the query
@InputType()
export class CreateItemInput {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  @Field(() => String, {
    name: 'name',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Field(() => Int, {
    name: 'quantity',
  })
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Field(() => Int, {
    name: 'quantity_units',
  })
  quantity_units: number;
}
