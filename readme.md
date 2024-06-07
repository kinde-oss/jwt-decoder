# Kinde JWT decoder

## Description

Simple library to decode JWT tokens

## Installation

```bash
# npm
npm install @kinde/jwt-decoder
# yarn
yarn add @kinde/jwt-decoder
# pnpm
pnpm install @kinde/jwt-decoder
```

## Usage

__import function__
```ts
import { jwtDecoder } from "@kinde/jwt-decoder";
```

__Simple decode__
```ts
const decodedToken = jwtDecoder("eyJhbGc...");
```

__Decode with extended type__

```ts
const decodedToken = jwtDecoder<JWTDecoded & {
  // Extra attributes here
}>("eyJhbGc...");
```

## Kinde documentation

[Kinde Documentation](https://kinde.com/docs/) - Explore the Kinde docs

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License

By contributing to Kinde, you agree that your contributions will be licensed under its MIT License.
