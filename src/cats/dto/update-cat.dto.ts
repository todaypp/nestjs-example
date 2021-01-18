import { PartialType } from '@nestjs/mapped-types';

import CreateCatDto from './create-cat.dto';

export default class UpdateCatDto extends PartialType(CreateCatDto) {}
