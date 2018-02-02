import 'reflect-metadata';

import { Serialize, SerializeProp, SerializeType } from '.';
import { SERIALIZE_PROP_META_KEY } from './serializer.constants';

const jsonObject = {
  id: '1',
  title: 'Learn MobX',
  description: 1234567890,
  createdDate: '2017',
  firstName: 'true',
  lastName: 'Brown',
  person: {
    firstName: 'Oh',
    lastName: 'Shit'
  }
};

class Person {
  @SerializeProp({ as: 'number' })
  firstName: string;

  lastName: string;
}

@Serialize()
class CreateTodo {
  @SerializeProp({ as: 'number' })
  id: number;

  @SerializeProp({ as: x => x + '!' })
  title: string;

  @SerializeProp({ as: 'string' })
  description?: string;

  @SerializeProp({ as: 'boolean' })
  firstName: string;

  @SerializeProp({ as: a => 'Overriden!' })
  lastName: string;

  @SerializeProp()
  @SerializeType(() => Person)
  person: Person;
}

const sps: { [key: string]: { as: any; fn: any } | null } = Reflect.getMetadata(
  SERIALIZE_PROP_META_KEY,
  CreateTodo.prototype
);

const betterClassObj = new CreateTodo();

Object.keys(sps).map(k => {
  const as = sps[k] ? sps[k].as : null;
  const fn = sps[k] ? sps[k].fn : null;

  if (as) {
    switch (as) {
      case 'number':
        betterClassObj[k] = +jsonObject[k];
        break;
      case 'string':
        betterClassObj[k] = `${jsonObject[k]}`;
        break;
      case 'boolean':
        betterClassObj[k] =
          jsonObject[k] === 'true' || jsonObject[k] === 'True' || jsonObject[k] === 1 || jsonObject[k] === '1';
        break;
      default:
        betterClassObj[k] = (as as any)(jsonObject[k]);
    }
  } else {
    betterClassObj[k] = jsonObject[k];
  }

  if (fn) {
    betterClassObj[k] = new fn();
  }
});

console.log('betterClassObj', betterClassObj);
