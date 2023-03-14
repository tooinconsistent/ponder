# api

This project relies on `bun` as a js runtime, but can be run using `node` as well.

## Dependencies

To install dependencies:

```bash
bun install
```

or

```bash
bun install
```

## Running the app

If you are using connection to remote DB (such as staging environment) you _must_ use `node` as bun currently lacks full ssl support. You can use `bun` when running db locally.

```bash
bun run bun:dev
```

or

```bash
npm run node:dev
```

## Generating queries

Currently all the db access is done through pgtyped, which is essentially a compiler for sql.
After doing any changes to the `.sql` files, you need to run:

```bash
bun run generate:queries
```

Which will generate fully-typed functions that you can call to execute the sql.
