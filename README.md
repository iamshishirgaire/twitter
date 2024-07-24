# Twitter Clone
## Techstack Used

- Typescript
- NextJs
- Bun and Hono
- PostgreSQL
- Redis
- React Query
- Zustand

## Tasks

- [x] Initial Setup
- [x] Setup ShadcnUi
- [x] Google Authentication
- [x] Initial Feed Ui Layout
- [x] Add tweet
- [x] Add polls
- [x] Upload medias
- [x] Initial Messages Ui
- [x] Initial Notifications Ui
- [ ] Profile
- [x] Error Management (w sentry)
  
  ## How to run the project
    - Clone the project
    - Run `pnpm install`
    - Run `pnpm dev`
    - Visit `http://localhost:3000`

## How to build the project
- Run `pnpm build`
- Run `pnpm start`

## How to create docker image
- Run `docker build -t twitter-clone .`
- Run `docker run -p 3000:3000 twitter-clone`
- Visit `http://localhost:3000`

## How to contribute
- Fork the project
- Clone the project
- Create a branch
- Make your changes
- Push your changes
- Create a pull request