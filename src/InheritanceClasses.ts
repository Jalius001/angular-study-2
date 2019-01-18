// TODO: Implement later
interface Ability {
  getName();
  do();
}

class People {

  private name: string;
  protected abilities: Map<string, Function> = new class implements Map<string, Function> {
    readonly [Symbol.toStringTag]: string;
    readonly size: number;

    [Symbol.iterator](): IterableIterator<[string, Function]> {
      return undefined;
    }

    clear(): void {
    }

    delete(key: string): boolean {
      return false;
    }

    entries(): IterableIterator<[string, Function]> {
      return undefined;
    }

    forEach(callbackfn: (value: Function, key: string, map: Map<string, Function>) => void, thisArg?: any): void {
    }

    get(key: string): Function | undefined {
      return undefined;
    }

    has(key: string): boolean {
      return false;
    }

    keys(): IterableIterator<string> {
      return undefined;
    }

    set(key: string, value: Function): this {
      return undefined;
    }

    values(): IterableIterator<Function> {
      return undefined;
    }
  };

  constructor(name: string) {
    this.name = name;

    this.addAbility('cook');
    this.addAbility('sing');
    this.addAbility('dance');
    this.addAbility('teach');
  }

  protected addAbility(ability: string) {
    this.abilities.set(ability, function() {
      console.log(`I'm $this.name. I can $ability.`);
    });
  }

  public getAbilities(): Set<string> {
    return new Set(this.abilities.keys());
  }

  public do(ability: string) {
    if (this.abilities.has(ability)) {
      throw new Error(`I can not do $ability`);
    }
    const action = this.abilities.get(ability);
    action.apply(this, null);
  }
}

class Player extends People {

  constructor(name: string) {
    super(name);

    this.addAbility('fly planes');
    this.addAbility('play footbal');
  }
}

class Coder extends People {

  constructor(name: string) {
    super(name);
    this.addAbility('code');
  }
}

class Shooter extends People {

  constructor(name: string) {
    super(name);
    this.addAbility('shoot guns');
    this.addAbility('repair electronics');
  }
}

let peoples = [
  new People('Jane'),
  new Player('Jack'),
  new Coder('Emily'),
  new Shooter('Sandra')
];

for (const people of peoples) {
  people.getAbilities().forEach(ability => people.do(ability));
}
