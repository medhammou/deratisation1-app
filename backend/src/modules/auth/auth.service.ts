import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface User {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private readonly users: User[] = [
    {
      userId: 1,
      username: 'admin',
      password: 'admin', // In production, store hashed passwords only
    },
  ];

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = this.users.find((u) => u.username === username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
