import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '../entities/department.entity';

@Injectable()
export class DepartmentService {

  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>
  ) {}

  async find(){
    await this.departmentRepository.find({
      relations: ['cities']
    }
    )
  }

  async findOne(id:string) {
    await this.departmentRepository.findOne({
      where :{id:id},
      relations: ['cities']
    })
  }
}
