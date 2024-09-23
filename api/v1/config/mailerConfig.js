import nodemailer from 'nodemailer';
const config = {
  server: process.env.EMAIL_SERVER,
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  port: parseInt(process.env.EMAIL_PORT),
};

// Email configuration
const transporter = nodemailer.createTransport({
  host: config.server, // Replace with your email server
  port: config.port, // Replace with your server's port
  // secure: false, // true for 465, false for other ports
  auth: {
    user: config.user, // Replace with your email
    pass: config.password, // Replace with your email password
  },
});

export { transporter };
