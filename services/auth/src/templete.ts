export const forgotPasswordTemplate = (resetLink: string) => {
  return ` 
<!DOCTYPE html> 
<html lang="en"> 
<head> 
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Reset Your Password</title> 
    <style> 
        body { 
            margin: 0; 
            padding: 0; 
            font-family: Arial, sans-serif; 
            background-color: #f4f4f4; 
        } 
        .email-wrapper { 
            width: 100%; 
            border-collapse: collapse; 
        } 
        .email-container { 
            width: 600px; 
            border-collapse: collapse; 
            background-color: #ffffff; 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
            border-radius: 8px; 
            overflow: hidden; 
        } 
        .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            padding: 40px 30px; 
            text-align: center; 
        } 
        .header h1 { 
            margin: 0; 
            color: #ffffff; 
            font-size: 28px; 
            font-weight: 600; 
        } 
        .content { 
            padding: 40px 30px; 
        } 
        .text { 
            margin: 0 0 20px; 
            color: #333333; 
            font-size: 16px; 
            line-height: 1.6; 
        } 
        .text-muted { 
            margin: 0 0 20px; 
            color: #666666; 
            font-size: 14px; 
            line-height: 1.6; 
        } 
        .button-wrapper { 
            margin: 30px 0; 
            text-align: center; 
        } 
        .button { 
            display: inline-block; 
            padding: 14px 40px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: #ffffff; 
            text-decoration: none; 
            border-radius: 6px; 
            font-weight: 600; 
            font-size: 16px; 
            box-shadow: 0 4px 6px rgba(102, 126, 234, 0.4); 
        } 
        .link-box { 
            margin: 0 0 20px; 
            padding: 15px; 
            background-color: #f8f9fa; 
            border-left: 4px solid #667eea; 
            color: #667eea; 
            font-size: 14px; 
            word-break: break-all; 
            border-radius: 4px; 
        } 
        .warning { 
            margin: 20px 0; 
            color: #666666; 
            font-size: 14px; 
            line-height: 1.6; 
        } 
        .footer { 
            background-color: #f8f9fa; 
            padding: 30px; 
            text-align: center; 
            border-top: 1px solid #e9ecef; 
        } 
        .footer-text { 
            margin: 0 0 10px; 
            color: #999999; 
            font-size: 12px; 
        } 
        .footer-text:last-child { 
            margin: 0; 
        } 
    </style> 
</head> 
<body> 
    <table role="presentation" class="email-wrapper"> 
        <tr> 
            <td align="center" style="padding: 40px 0;"> 
                <table role="presentation" class="email-container"> 
                    <!-- Header --> 
                    <tr> 
                        <td class="header"> 
                            <h1>Reset Your Password</h1> 
                        </td> 
                    </tr> 
                     
                    <!-- Content --> 
                    <tr> 
                        <td class="content"> 
                            <p class="text">Hi there,</p> 
                            <p class="text"> 
                                We received a request to reset your password. Click the 
button below to create a new password: 
                            </p> 
                             
                            <!-- Button --> 
                            <div class="button-wrapper"> 
                                <a href="${resetLink}" class="button">Reset Password</a> 
                            </div> 
                             
                            <p class="text-muted"> 
                                Or copy and paste this link into your browser: 
                            </p> 
                            <p class="link-box">${resetLink}</p> 
                             
                            <p class="warning"> 
                                <strong>⏰ This link will expire in 15 minutes</strong> 
for security reasons. 
                            </p> 
                             
                            <p class="text-muted"> 
                                If you didn't request a password reset, please ignore this 
email or contact support if you have concerns. 
                            </p> 
                        </td> 
                    </tr> 
                     
                    <!-- Footer --> 
                    <tr> 
                        <td class="footer"> 
                            <p class="footer-text"> 
                                © 2025 Job Portal. All rights reserved. 
                            </p> 
                            <p class="footer-text"> 
                                This is an automated message, please do not reply. 
                            </p> 
                        </td> 
                    </tr> 
                </table> 
            </td> 
        </tr> 
    </table> 
</body> 
</html> 
  `;
};
