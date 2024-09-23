import { transporter } from '../config/mailerConfig.js';

class Email {
  #from;
  #recipients;
  #message;
  #subject;
  #html;

  constructor({
    from = process.env.EMAIL_USER,
    recipients = [],
    message,
    subject = 'No Subject',
    html,
  }) {
    if (recipients.length === 0) {
      throw new Error('Recipients array cannot be empty');
    }
    this.#from = from;
    this.#recipients = [...recipients];
    this.#message = message;
    this.#subject = subject;
    this.#html = html;
  }

  get recipients() {
    return this.#recipients;
  }
  get message() {
    return this.#message;
  }
  get subject() {
    return this.#subject;
  }
  get html() {
    return this.#html;
  }

  sendEmail() {
    for (let recipient of this.#recipients) {
      let mailOptions = {
        from: this.#from,
        to: recipient,
        subject: this.#subject,
        text: this.#message,
        html: this.#html,
      };

      return transporter.sendMail(mailOptions);
    }
  }
}
export { Email };
