import { AuthGuard } from '@nestjs/passport';

export class JwtGauard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
