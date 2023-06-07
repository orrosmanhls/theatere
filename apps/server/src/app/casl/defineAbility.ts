import { IUser } from '@node-monorepo/types';
import { CaslService } from './casl.service';

export function defineRulesFor(user: IUser) {
  const caslService = new CaslService();
  const { rules } = caslService.defineRulesFor(user);
  return rules;
}
