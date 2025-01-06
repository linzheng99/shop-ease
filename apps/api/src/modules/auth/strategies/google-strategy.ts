import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { AuthService } from '../auth.service';
import googleOauthConfig from '../config/google-oauth-config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private readonly googleConfig: ConfigType<typeof googleOauthConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: googleConfig.clientID,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackURL,
      scope: ['email', 'profile'],
    });
    const agent = new HttpsProxyAgent(
      process.env.HTTP_PROXY || 'http://127.0.0.1:7890',
    );
    this._oauth2.setAgent(agent);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const user = await this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      name: profile.displayName,
      password: '',
    });

    done(null, user);
  }
}
