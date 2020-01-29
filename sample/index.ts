import "reflect-metadata";
import {
  Entity,
  Column,
  createConnection,
  PrimaryGeneratedColumn
} from "typeorm";
import { Container, Inject } from "typedi";
import {
  Context,
  Aggregate,
  Service,
  Transactional,
  TransactionManager
} from "../src";
import { TypeOrmRepository, TypeOrmTransactionManager } from "../src/typeorm";

@Entity()
class Person extends Aggregate<Person> {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  age!: number;

  constructor(args?: { name: string; age: number }) {
    super();
    if (args) {
      this.name = args.name;
      this.age = args.age;
    }
  }
}

class PersonRepository extends TypeOrmRepository<Person> {
  async findAll(): Promise<Person[]> {
    return this.entityManager.find(Person);
  }
}

class PersonService extends Service {
  @Inject()
  private personRepository!: PersonRepository;

  @Transactional()
  async create() {
    const person = new Person({ name: "charlie", age: 33 });
    await this.personRepository.save([person]);
  }

  async getAll(): Promise<Person[]> {
    return this.personRepository.findAll();
  }
}

async function sleep(ms: number) {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, ms)
  );
}

(async () => {
  await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "core",
    synchronize: true,
    logging: true,
    supportBigNumbers: true,
    bigNumberStrings: false,
    entities: [Person]
  });

  // DO THIS WHEN YOUR APP STARTS
  Container.set({
    id: TransactionManager,
    type: TypeOrmTransactionManager
  });

  const context = Context.of("TXID");

  const personService = context.get(PersonService);

  console.log(await personService.getAll());
  await sleep(1000);
  await personService.create();
})();
