
import { SchemaPath, validate } from '@angular/forms/signals';

const BLACKLIST = [
  'spam@gmail.com',
  'test@gmail.com',
  'fake@gmail.com'
];

export function blacklistValidator(path: SchemaPath<string>): void {
  validate(path, ({ value }) => {
    const email = value().trim().toLowerCase();

    if (BLACKLIST.includes(email)) {
      return {
        kind: 'blacklistedEmail',
        message: 'Cette adresse email est interdite.'
      };
    }

    return null;
  });
}
