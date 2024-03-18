# Development

To setup your local environment follow the next steps.

## Requirements

* Latest [Yarn Classic](https://classic.yarnpkg.com)
* NodeJS (Use version set on [.nvmrc](https://github.com/stackbuilders/assertive-ts/blob/master/.nvmrc))

## Useful commands

### Install dependencies

```console
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

Scopes are optional on Conventional Commits, but we take advantange of them to specify the package a change is aimed for. The table below describes the the available scopes and what package they affect:

| Scope   | Package               | Commit example                   |
| :-----: | :-------------------: | -------------------------------- |
| `all`   | All packages          | feat(all): Upadate TypeScript    |
| `core`  | `@assertive-ts/core`  | fix(core): Boolean assertion bug |
| `sinon` | `@assertive-ts/sinon` | fix(sinon): Spy assertion bug    |
