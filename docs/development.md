# Development

To setup your local environment follow the next steps. [AGENTS.md](../AGENTS.md) is the instruction file for coding agents.

## Requirements

* NodeJS (Use version set on [.nvmrc](https://github.com/stackbuilders/assertive-ts/blob/main/.nvmrc))
* [Corepack](https://yarnpkg.com/corepack), which provides the Yarn 4 version pinned in `package.json`. Run `corepack enable` once. NodeJS 25 and later no longer bundle it, so run `npm install -g corepack` first.

## Useful commands

### Install dependencies

```console
corepack enable
yarn install
```

### Compile TS files

```console
yarn compile
```

### Lint code

```console
yarn lint
```

### Run tests

```console
yarn test
```

## Release process

The release process is automated by [semantic-release](https://semantic-release.gitbook.io/semantic-release/), so please make sure that the first commit of any PR follows the [Conventional Commits standard](https://www.conventionalcommits.org/). Take a look at semantic-release documentation if you're not sure what type of commit you should use.

### Scopes

Scopes are optional on Conventional Commits, but we take advantage of them to specify the package a change is aimed for. The table below describes the available scopes and what package they affect:

| Scope    | Package                | Commit example                     |
| :------: | :--------------------: | ---------------------------------- |
| `all`    | All packages           | feat(all): Update TypeScript      |
| `core`   | `@assertive-ts/core`   | fix(core): Boolean assertion bug   |
| `dom`    | `@assertive-ts/dom`    | fix(dom): Element assertion bug    |
| `native` | `@assertive-ts/native` | fix(native): Element assertion bug |
| `sinon`  | `@assertive-ts/sinon`  | fix(sinon): Spy assertion bug      |
