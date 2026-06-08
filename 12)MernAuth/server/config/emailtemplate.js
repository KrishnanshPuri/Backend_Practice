export const EMAIL_VERIFY_TEMPLATE = (otp) =>`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0d1117; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #c9d1d9;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0d1117; padding: 40px 20px;">
        <tr>
            <td align="center">
                
                <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #161b22; border: 1px solid #30363d; border-radius: 12px; overflow: hidden; box-shadow: 0 0 20px rgba(88, 166, 255, 0.1);">
                    
                    <tr>
                        <td align="center" style="background: linear-gradient(90deg, #1f6feb 0%, #8957e5 100%); padding: 30px 20px;">
                            <div style="font-size: 48px; margin-bottom: 10px;">🛡️</div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: 1px;">SYSTEM VERIFICATION</h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #8b949e;">
                                Greetings Human,<br><br>
                                A request to authenticate your identity has been initiated. To proceed with the system handshake, please enter the following secure access code:
                            </p>

                            <div style="text-align: center; margin: 30px 0;">
                                <div style="display: inline-block; background-color: #0d1117; border: 1px solid #58a6ff; border-radius: 8px; padding: 15px 30px; box-shadow: inset 0 0 10px rgba(88, 166, 255, 0.2);">
                                    <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: bold; color: #58a6ff; letter-spacing: 8px;">${otp}</span>
                                </div>
                            </div>

                            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #8b949e; text-align: center;">
                                This code will self-destruct in <strong>10 minutes</strong>.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 20px 30px; background-color: #10141a; border-top: 1px solid #30363d; text-align: center;">
                            <p style="margin: 0; font-size: 12px; color: #484f58;">
                                If you did not initiate this sequence, please ignore this transmission. Your system remains secure.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>`

export const PASSWORD_RESET_TEMPLATE = (otp) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0d1117; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #c9d1d9;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0d1117; padding: 40px 20px;">
        <tr>
            <td align="center">
                
                <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #161b22; border: 1px solid #30363d; border-radius: 12px; overflow: hidden; box-shadow: 0 0 20px rgba(255, 123, 114, 0.1);">
                    
                    <tr>
                        <td align="center" style="background: linear-gradient(90deg, #d2a8ff 0%, #ff7b72 100%); padding: 30px 20px;">
                            <div style="font-size: 48px; margin-bottom: 10px;">🔐</div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: 1px;">SECURITY OVERRIDE</h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #8b949e;">
                                Attention Human,<br><br>
                                A protocol to override your current system credentials has been triggered. To authorize this modification and reset your password, please input the following decryption key:
                            </p>

                            <div style="text-align: center; margin: 30px 0;">
                                <div style="display: inline-block; background-color: #0d1117; border: 1px solid #ff7b72; border-radius: 8px; padding: 15px 30px; box-shadow: inset 0 0 10px rgba(255, 123, 114, 0.2);">
                                    <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: bold; color: #ff7b72; letter-spacing: 8px;">${otp}</span>
                                </div>
                            </div>

                            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #8b949e; text-align: center;">
                                This decryption key will self-destruct in <strong>10 minutes</strong>.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 20px 30px; background-color: #10141a; border-top: 1px solid #30363d; text-align: center;">
                            <p style="margin: 0; font-size: 12px; color: #484f58;">
                                CRITICAL WARNING: If you did not initiate this sequence, your access may be compromised. Ignore this transmission and immediately secure your system.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>`