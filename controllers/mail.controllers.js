const nodemailer = require('nodemailer');



exports.sendEmail = async (req, res) => {
    console.log(req.body);


    console.log("hi22222222");

    const { to, subject, text } = req.body;

    console.log("to" + to);
    console.log("text" + text);



    // Create a nodemailer transporter using your email provider's settings
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "733aa0e28aee9d",
            pass: "1b40c03496ea53"
        }
    });

    // Email options
    const mailOptions = {
        from: 'mall-navigation@outlook.com',
        to,
        subject,
        text,
    };
    console.log(mailOptions);

    //     // Send email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email. Please try again.');
    }
};