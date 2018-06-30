import User from '../models/user'
export default class UserService {
  list(): User[] {
    return [{
      id: 1,
      username: "zhongzhong",
      email: "zhongzhong@asloop.com"
    }]
  }
}