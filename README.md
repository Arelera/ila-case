# ila-case

This is a React application scaffolded using [Vite.js](https://vitejs.dev/) and uses [Bun](https://bun.sh/) as the package manager, styled with [Bootstrap](https://getbootstrap.com/) and the [Argon Dashboard theme](https://www.creative-tim.com/product/argon-dashboard).

The live app can be viewed [here](https://ila-case-one.vercel.app/).

## Local Development

To set up the project locally, follow these steps:

1. Install dependencies:

   ```shell
   bun install
   ```

2. Copy the example environment variables file and fill in the required values:

   ```shell
   cp .env.example .env.local
   ```

3. Start the development server:

   ```shell
   bun dev
   ```

4. Visit [http://localhost:5173/](http://localhost:5173/) to view the live application.

A sample user to view the app in the live application is `test@test.com` email with `Test1234` as the password.

## Scripts

- `bun install`: Install project dependencies.
- `bun dev`: Start the development server.
- `bun build`: Build the project for production.
- `bun test`: Run tests.

## Project Routes

Here are the available routes in the project:

- `/`: The home page of the application.
- `/register`: The register page that the user must go through after sign up.
- `/dashboard`: The main dashboard page containing the products table.
- `/dashboard/products/:id`: The details about a selected product from the dashboard page.

## Some Notes About the App

- I would normally use RTK Query as the app uses Redux Toolkit already, but to use `axios` along with it RTK, I created a similar flow using the `createAsyncThunk` function from RTK. Another way to use axios along with RTK would have been to modify the `baseQuery` of RTK Query, but I decided to be more explicit about the use of `axios` for the case.
- The context to use Auth0 is handled by the Auth0 sdk with `Auth0Provider`, which should satify the requirement of handling the user state with context.
