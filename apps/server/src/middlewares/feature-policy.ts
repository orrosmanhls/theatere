import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Set the default Feature-Policy header to disallow any permission
@Injectable()
export class FeaturePolicyMiddleware implements NestMiddleware {
  use(_: Request, response: Response, next: NextFunction): void {
    response.setHeader(
      'Feature-Policy',
      "vibrate 'none'; camera 'none'; microphone 'none'; geolocation 'none';"
    );
    next();
  }
}
