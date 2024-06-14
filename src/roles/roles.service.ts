import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/roles.entity';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>
  ) {}
}
