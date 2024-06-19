import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) {}

  async signIn(email: string, password: string) {
      const user = await this.usersService.findByEmail(email);
      
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid email or password.');
      }

      //console.log(user)

      const payload = {id: user.id, email: user.email, name: user.name, role: user.role};
      return {
        ...payload,
        token: await this.jwtService.signAsync(payload)
      }
  }


}
