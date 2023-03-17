import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';

export class facebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: '1062170161426265',
      clientSecret: 'bb6e5b736aa9f5ac766d27da83ae6125',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name', 'picture'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    // Here, you can use the profile data to create or authenticate a user in your database.
    // The `done` callback should be called with the user object (or an error) as the second argument.
    done(null, profile);
  }
}
