import User from '../models/user'
import { Service } from '../decorators/autowired';

@Service()
export default class UserService {
  list(): User[] {
    return [{
      id: 1,
      username: "zhongzhong",
      email: "zhongzhong@asloop.com"
    }]
  }
}