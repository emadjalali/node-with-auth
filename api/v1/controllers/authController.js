import { AuthService } from '../services/authService.js';

async function registerUser(req, res) {
  try {
    const userDetails = req.body;
    const authService = new AuthService();
    let result = await authService.register(userDetails);
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
}

async function sendLinkToVerifyEmail(req, res) {
  try {
    const { username, recipient } = req.body;
    const authService = new AuthService();
    let result = await authService.sendLinkToVerifyEmail(username, recipient);
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
}

async function sendCodeToVerifyEmail(req, res) {
  try {
    const { username, recipient } = req.body;
    const authService = new AuthService();
    let token = await authService.sendCodeToVerifyEmail(username, recipient);
    res.cookie('confirmationToken', token, {
      httpOnly: true,
      secure: process.env.ENV === 'development' ? false : true,
      sameSite: 'strict',
      maxAge: 5 * 60 * 1000, // 5 min in milliseconds
    });
    res.send('Code sent');
  } catch (err) {
    res.send(err.message);
  }
}

async function verifyEmailByLink(req, res) {
  try {
    const { token } = req.query;
    const authService = new AuthService();
    await authService.verifyEmailByToken(token);
    res.send('Email verified');
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function verifyEmailByCode(req, res) {
  try {
    const { code } = req.body;
    const token = req.cookies.confirmationToken;
    const authService = new AuthService();
    await authService.verifyEmailByCodeAndToken(code, token);
    res.send('Email verified');
  } catch (err) {
    res.status(400).send(err.message);
  }
}

export {
  registerUser,
  sendLinkToVerifyEmail,
  sendCodeToVerifyEmail,
  verifyEmailByLink,
  verifyEmailByCode,
};
