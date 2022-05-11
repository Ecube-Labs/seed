import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DataSource
} from "typeorm";
import { Container, Service, Inject, ServiceOptions } from "typedi";
import {
  Context,
  Aggregate,
  Service as ApplicationService,
  Transactional,
  TransactionManager
} from "../src";
import { TypeOrmRepository, TypeOrmTransactionManager, dataSourceMap } from "../src/typeorm";

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

@Service()
class PersonRepository extends TypeOrmRepository<Person, number> {
  entityClass = Person;

  async findAll(): Promise<Person[]> {
    return this.entityManager.find(Person);
  }
}

@Service()
class PersonService extends ApplicationService {
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

  async get(id: number): Promise<Person> {
    return this.personRepository.findOneOrFail(id);
  }
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, ms)
  );
}

(async () => {
  const dataSource = new DataSource({
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
  await dataSource.initialize();

  // DO THIS WHEN YOUR APP STARTS
  Container.set({
    id: dataSourceMap,
    value: { default: dataSource },
    global: true,
  });
  Container.set({
    id: TransactionManager,
    type: TypeOrmTransactionManager,
  } as ServiceOptions<TypeOrmTransactionManager>);

  const context = Context.of("TXID");

  const personService = context.get(PersonService);

  console.log(await personService.getAll());
  await sleep(1000);

  await personService.create();
  await sleep(1000);

  console.log(await personService.get(1));
})();
