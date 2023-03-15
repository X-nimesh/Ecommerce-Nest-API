import { PassportStrategy } from '@nestjs/passport';
import { access } from 'fs';
// import { Strategy } from 'passport-jwt';
import { Strategy, Profile } from 'passport-google-oauth20';

export class googleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '896996913911-np3aobte4peelf60ou8dtjun42i75q6a.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const { emails, name, photos } = profile;
    console.log(profile);
    return {
      accessToken,
      refreshToken,
      profile,
      email: emails[0].value,
      name: name.givenName + ' ' + name.familyName,
      avatarUrl: photos[0].value,
    };
  }
}
