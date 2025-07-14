interface SessionData {
  username: string;
  loginTime: number;
  lastActivity: number;
  otpAttempts: number;
  pageVisits: number;
  isLocked: boolean;
}

const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const MAX_OTP_ATTEMPTS = 3;
const MAX_PAGE_VISITS_PER_HOUR = 10;

class SessionManager {
  private sessionData: SessionData | null = null;

  initSession(username: string) {
    const now = Date.now();
    this.sessionData = {
      username,
      loginTime: now,
      lastActivity: now,
      otpAttempts: 0,
      pageVisits: 0,
      isLocked: false,
    };
    this.saveToStorage();
  }

  updateActivity() {
    if (this.sessionData) {
      this.sessionData.lastActivity = Date.now();
      this.sessionData.pageVisits += 1;
      this.saveToStorage();
    }
  }

  incrementOTPAttempts(): boolean {
    if (this.sessionData) {
      this.sessionData.otpAttempts += 1;
      if (this.sessionData.otpAttempts >= MAX_OTP_ATTEMPTS) {
        this.sessionData.isLocked = true;
      }
      this.saveToStorage();
      return this.sessionData.otpAttempts < MAX_OTP_ATTEMPTS;
    }
    return false;
  }

  isSessionValid(): boolean {
    if (!this.sessionData || this.sessionData.isLocked) {
      return false;
    }

    const now = Date.now();
    const timeSinceLastActivity = now - this.sessionData.lastActivity;
    
    if (timeSinceLastActivity > SESSION_TIMEOUT) {
      this.clearSession();
      return false;
    }

    // Check page visit limit (per hour)
    const hoursSinceLogin = (now - this.sessionData.loginTime) / (1000 * 60 * 60);
    if (hoursSinceLogin < 1 && this.sessionData.pageVisits > MAX_PAGE_VISITS_PER_HOUR) {
      this.sessionData.isLocked = true;
      this.saveToStorage();
      return false;
    }

    return true;
  }

  getSessionData(): SessionData | null {
    return this.sessionData;
  }

  getRemainingTime(): number {
    if (!this.sessionData) return 0;
    const elapsed = Date.now() - this.sessionData.lastActivity;
    return Math.max(0, SESSION_TIMEOUT - elapsed);
  }

  getOTPAttemptsRemaining(): number {
    if (!this.sessionData) return MAX_OTP_ATTEMPTS;
    return Math.max(0, MAX_OTP_ATTEMPTS - this.sessionData.otpAttempts);
  }

  clearSession() {
    this.sessionData = null;
    localStorage.removeItem('mygovSession');
  }

  private saveToStorage() {
    if (this.sessionData) {
      localStorage.setItem('mygovSession', JSON.stringify(this.sessionData));
    }
  }

  loadFromStorage() {
    const stored = localStorage.getItem('mygovSession');
    if (stored) {
      try {
        this.sessionData = JSON.parse(stored);
      } catch {
        this.clearSession();
      }
    }
  }
}

export const sessionManager = new SessionManager();