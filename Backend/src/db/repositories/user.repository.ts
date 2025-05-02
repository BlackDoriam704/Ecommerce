import { User } from '../model/User.model';

class UserRepository {
  /**
   * Buscar usuario por email
   */
  async findByEmail(email: string) {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      throw new Error('Error finding user by email');
    }
  }

  /**
   * Crear un nuevo usuario
   */
  async create(userData: Partial<User>) {
    try {
      return await User.create(userData);
    } catch (error) {
      throw new Error('Error creating user');
    }
  }
}

export default new UserRepository();