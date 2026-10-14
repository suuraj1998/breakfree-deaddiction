/**
 * Aegis Biometric Security Engine
 * Supports WebAuthn (Touch ID / Face ID / Windows Hello) with tactile fallback
 */

export interface BiometricAuthResult {
  success: boolean;
  method: 'webauthn' | 'biometric_touch' | 'pin';
  error?: string;
}

export async function isWebAuthnAvailable(): Promise<boolean> {
  if (
    typeof window !== 'undefined' &&
    window.PublicKeyCredential &&
    typeof window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function'
  ) {
    try {
      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    } catch {
      return false;
    }
  }
  return false;
}

export async function triggerNativeBiometrics(): Promise<BiometricAuthResult> {
  const available = await isWebAuthnAvailable();
  if (available && navigator.credentials) {
    try {
      // Mock challenge buffer
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      // Request platform authenticator assertion
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge,
          rpId: window.location.hostname || 'localhost',
          userVerification: 'preferred',
          timeout: 60000,
        },
      });

      if (credential) {
        return { success: true, method: 'webauthn' };
      }
    } catch (e: any) {
      console.warn('WebAuthn prompt dismissed or not provisioned, falling back:', e?.message);
    }
  }

  // Graceful tactile verification fallback
  return { success: false, method: 'biometric_touch', error: 'Platform authenticator not provisioned' };
}
