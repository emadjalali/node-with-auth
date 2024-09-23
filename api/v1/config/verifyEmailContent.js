const verifyEmailByLinkHtml = (token) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #333;">Your Verification Link</h2>
      <p style="color: #555;">Hello,</p>
      <p style="color: #555;">Thank you for registering with us. Please use the following link to complete your registration. This link will expire in 5 minutes.</p>
      <div style="text-align: left; margin: 20px 0;">
        ${process.env.VERIFY_EMAIL_URL}?token=${token}
      </div>
      <p style="color: #555;">If you did not request this verification, please ignore this email.</p>
      <p style="color: #555;">Best regards,</p>
    </div>
  `;
};

const verifyEmailByCodeHtml = (verificationCode) => {
  const codeArray = verificationCode
    .split('')
    .map(
      (num) =>
        `<span style="display: inline-block; padding: 10px; margin: 5px 2px; background-color: #f0f0f0; font-size: 24px; font-weight: bold;">${num}</span>`,
    )
    .join('');

  return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Your Verification Code</h2>
        <p style="color: #555;">Hello,</p>
        <p style="color: #555;">Thank you for registering with us. Please use the following verification code to complete your registration. This code will expire in 5 minutes.</p>
        <div style="text-align: center; margin: 20px 0;">
          ${codeArray}
        </div>
        <p style="color: #555;">If you did not request this code, please ignore this email.</p>
        <p style="color: #555;">Best regards,</p>
      </div>
    `;
};

export { verifyEmailByLinkHtml, verifyEmailByCodeHtml };
