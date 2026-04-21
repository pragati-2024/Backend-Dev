# Exercise 3 — User Activity Tracker (Mongoose Middleware)

Tracks automatically:

- `loginAt` (on session creation)
- `logoutAt` (on logout update)
- `lastActiveAt` (auto-refreshed on any session update via Mongoose middleware)

## Setup

1. Start MongoDB locally.

2. Install

```bash
npm install
```

3. Create `.env`

- Copy `.env.example` to `.env`

4. Run

```bash
npm start
```

Server: `http://localhost:3003`

## Test flow

1. Login (creates session + returns JWT):

```bash
curl -X POST http://localhost:3003/login -H "Content-Type: application/json" -d "{\"userId\":\"user-1\"}"
```

2. Ping activity (updates `lastActiveAt` automatically):

```bash
curl -X POST http://localhost:3003/ping -H "Authorization: Bearer YOUR_JWT"
```

3. Logout:

```bash
curl -X POST http://localhost:3003/logout -H "Authorization: Bearer YOUR_JWT"
```

4. View sessions:

```bash
curl http://localhost:3003/sessions
```
