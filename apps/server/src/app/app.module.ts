import { FeaturePolicyMiddleware } from './../middlewares/feature-policy';
// DO NOT DELETE THIS COMMENT PLOP HELPER IMPORT
import { ActorModule } from './actor/actor.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseConnectionModule } from './mongoose.module';
import { HealthModule } from './health/health.module';
import { HttpLoggerMiddleware } from '../middlewares/http-logger';
import { PlaysModule } from './plays/plays.module';

export const AppModules = [
  // DO NOT DELETE THIS COMMENT PLOP HELPER MODULE
  ActorModule,
  HealthModule,
  PlaysModule
];
@Module({
  imports: [MongooseConnectionModule, ...AppModules],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
    consumer.apply(FeaturePolicyMiddleware).forRoutes('*');
  }
}
