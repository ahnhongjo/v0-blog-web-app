---
title: "TypeScript Tips and Tricks for Better Code"
date: "2024-11-28"
summary: "Level up your TypeScript skills with these practical tips, patterns, and best practices."
tags: ["typescript", "javascript", "web-development"]
thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop"
---

# TypeScript Tips and Tricks for Better Code

TypeScript has become essential for modern JavaScript development. Here are some tips to help you write better TypeScript code.

## 1. Use Strict Mode

Always enable strict mode in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

## 2. Leverage Type Inference

Let TypeScript do the work when possible:

```typescript
// ❌ Unnecessary type annotation
const name: string = "John"

// ✅ Let TypeScript infer
const name = "John" // TypeScript knows it's a string
```

## 3. Use Discriminated Unions

Great for handling different states:

```typescript
type State =
  | { status: "loading" }
  | { status: "success"; data: User[] }
  | { status: "error"; error: string }

function handleState(state: State) {
  switch (state.status) {
    case "loading":
      return <Spinner />
    case "success":
      return <UserList users={state.data} />
    case "error":
      return <Error message={state.error} />
  }
}
```

## 4. Use `satisfies` for Better Inference

New in TypeScript 4.9+:

```typescript
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
} satisfies Config

// config.apiUrl is typed as the literal "https://api.example.com"
// not just string!
```

## 5. Generic Constraints

Make your generics more specific:

```typescript
// ❌ Too loose
function getProperty<T>(obj: T, key: string) {
  return obj[key] // Error!
}

// ✅ Constrained properly
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
```

## 6. Utility Types

Master the built-in utility types:

| Type | Description |
|------|-------------|
| `Partial<T>` | Makes all properties optional |
| `Required<T>` | Makes all properties required |
| `Pick<T, K>` | Select specific properties |
| `Omit<T, K>` | Remove specific properties |
| `Record<K, V>` | Create object type with key-value pairs |

```typescript
interface User {
  id: number
  name: string
  email: string
}

type UserPreview = Pick<User, "id" | "name">
type UserWithoutEmail = Omit<User, "email">
type PartialUser = Partial<User>
```

## 7. Template Literal Types

Create precise string types:

```typescript
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE"
type Route = `/${string}`
type Endpoint = `${HTTPMethod} ${Route}`

const endpoint: Endpoint = "GET /users" // ✅
const invalid: Endpoint = "FETCH /users" // ❌ Error
```

## Conclusion

TypeScript is a powerful tool that catches errors before runtime. By using these patterns, you'll write safer, more maintainable code.

> "TypeScript is JavaScript that scales." - Microsoft
