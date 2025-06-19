import { Injectable, NotFoundException } from '@nestjs/common'; // Import NotFoundException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } }); // Assign to a variable
    if (!user) {
      // Check for null
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }
    return user; // Return the non-null user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } }); // Assign to a variable
    if (!user) {
      // Check for null
      throw new NotFoundException(`User with email "${email}" not found.`);
    }
    return user; // Return the non-null user
  }

  async create(userData: Partial<User>): Promise<User> {
    if (userData.password) {
      userData.password = await this.hashPassword(userData.password);
    }

    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    if (userData.password) {
      userData.password = await this.hashPassword(userData.password);
    }

    await this.usersRepository.update(id, userData);
    // Call findOne to get the updated entity, which now handles null
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id); // Use delete directly
    if (result.affected === 0) {
      // Check if any row was affected
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    // This method *is* designed to return null if not found, so no NotFoundException here.
    const user = await this.findByEmail(email).catch(() => null); // Catch NotFoundException from findByEmail to return null

    if (user && (await this.comparePassword(password, user.password))) {
      return user;
    }

    return null;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  private async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
