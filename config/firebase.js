const { OAuth2Client } = require('google-auth-library');

// Initialize Google OAuth client
const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

// Verify Google ID token
const verifyGoogleToken = async (idToken) => {
  try {
    console.log('Verifying Google ID token...');
    const ticket = await googleClient.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    console.log('Google token verified successfully for:', payload.email);
    
    return {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      emailVerified: payload.email_verified
    };
  } catch (error) {
    console.error('Error verifying Google token:', error.message);
    throw new Error('Invalid Google token');
  }
};

module.exports = {
  googleClient,
  verifyGoogleToken
};
