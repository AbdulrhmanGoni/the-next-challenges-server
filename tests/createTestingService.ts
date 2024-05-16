import { Test } from '@nestjs/testing';
import { MongooseModule, ModelDefinition } from '@nestjs/mongoose';
import { ModuleMetadata } from '@nestjs/common';
import {
  DynamicModule,
  ForwardReference,
  Provider,
  Type,
} from '@nestjs/common/interfaces';
import testingDatabaseURI from './testingDatabaseURI';

export default async function createTestingService<MainServiceType>({
  MainService,
  databaseModel,
  providers = [],
  imports = [],
  exports = [],
}: {
  MainService: string | symbol | Function | Type<any>;
  databaseModel: ModelDefinition;
  providers?: ModuleMetadata['providers'];
  exports?: ModuleMetadata['exports'];
  imports: (
    | Type<any>
    | DynamicModule
    | Promise<DynamicModule>
    | ForwardReference<any>
  )[];
}) {
  const module = await Test.createTestingModule({
    providers: [MainService as Provider, ...providers],
    exports: [MainService as Provider, ...exports],
    imports: [
      MongooseModule.forRoot(testingDatabaseURI),
      MongooseModule.forFeature([
        { name: databaseModel.name, schema: databaseModel.schema },
      ]),
      ...imports,
    ],
  }).compile();

  const service = module.get<typeof MainService>(
    MainService,
  ) as MainServiceType;
  return { service, app: module };
}
