const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Gmail address
        pass: process.env.EMAIL_PASS  // App-specific password
    },
    tls: {
        rejectUnauthorized: false  // ⬅️ This avoids the self-signed cert issue just for email
    }
});

const sendWelcomeEmail = (to, username, password) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: "Welcome to GAT Exam Portal",
        html: `
            <h3>Welcome to the GAT Exam Registration Portal!</h3>
            <p>Your registration was successful.</p>
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>Password:</strong> ${password}</p>
            <p>Please log in and change your password after first login.</p>
        `
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendWelcomeEmail;
