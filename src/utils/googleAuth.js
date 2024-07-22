import { OAuth2Client } from 'google-auth-library';
import fs from 'node:fs/promises';
import path from 'node:path';

import { env } from './env.js';

const googleAuthSettingsPath = path.resolve('google-auth.json');
const googleAuthSettings = JSON.parse(
  await fs.readFile(googleAuthSettingsPath),
);

const clientId = env('GOOGLE_AUTH_CLIENT_ID');
const clientSecret = env('GOOGLE_AUTH_CLIENT_SECRET');

const googleOAuthClient = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri: googleAuthSettings.web.redirect_uris[0],
});

export const generateAuthUrl = () => {
  return googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
};
