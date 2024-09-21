import { AuthService } from '../services/authService.js';

async function registerUser(req, res) {
  try {
    const authService = new AuthService();
    const userDetails = req.body;
    let result = await authService.register(userDetails);
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
}
export { registerUser };
