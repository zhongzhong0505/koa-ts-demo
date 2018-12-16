import User from '../models/user'
import { Service } from '../decorators/autowired';
import {getManager} from "typeorm";

@Service()
export default class UserService {
  private userRepository = getManager().getRepository<User>(User);
  
  async list(): Promise<User[]> {
    return await this.userRepository.find();
  }
}