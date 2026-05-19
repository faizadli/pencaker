# Testing (TDD) — pencaker frontend

## Stack

- **Vitest** for unit tests (pure TS, no browser required)
- Run: `npm test` | `npm run test:watch` | `npm run test:coverage`

Tests live next to code: `lib/storage/__tests__/*.test.ts`

## Layout

| Path                     | Role                                         |
| ------------------------ | -------------------------------------------- |
| `lib/storage/keys.ts`    | Normalize S3/API paths → DB keys             |
| `lib/storage/urls.ts`    | `resolveImageSrc`, `rewriteContentHtml`      |
| `lib/storage/image.ts`   | Next.js `unoptimized` rules                  |
| `lib/storage/resolve.ts` | Async presign (mock `services/ak1` in tests) |
| `services/storage.ts`    | Re-exports (stable imports for app code)     |

## TDD workflow

1. **Red** — Add a case in `lib/storage/__tests__/urls.test.ts` (or keys/image/resolve).
2. **Green** — Change `lib/storage/*.ts` until `npm test` passes.
3. **Refactor** — UI components import from `services/storage` only; no duplicate URL logic in pages.

## Mocking API calls

```ts
vi.mock("../../../services/ak1", () => ({
  presignDownload: vi.fn(),
}));
```

Use this in `resolve.test.ts` when testing `resolveStorageUrl`.

## What not to unit-test here

- Full Next.js pages (use E2E later if needed)
- `RemoteImage` DOM — covered indirectly via `lib/storage/image.ts`
