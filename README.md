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

## Theoreotical Question Answers

- **What is the difference between virtual DOM and real DOM?**: Virtual DOM is a representation of the Real DOM that React uses to optimize performance by only updating the real DOM when actually needed. When an event that can trigger a rerender happens, React first updates the Virtual DOM to then compare it with the real DOM, and only apply updates to the real DOM if there are changes to be made.

- **What is JSX?** JSX allows you to write HTML elements in JavaScript and place them in the DOM. It’s basically syntactic sugar for `React.createElement()`.

- **Why one choose React Context over Redux?** React Context is much simpler than Redux. Usually used for storing state that’s not too complex, or to prevent prop drilling in complex components. Redux has more features such as middleware, caching, dev tools, etc. and is meant more for complex state management needs.

- **How would you handle data flow and communication between parent and child components in a React application?** Parent component can pass data to the child component through props or Context. And the child component can call callback functions passed down by the parent component to communicate upwards. In both cases we can also use Redux as well and basically make the components pass data both ways, but if that data is not used by any other components, this will add unnecessary complexity.

- **Can you explain the concept of Higher Order Components in React and provide an example of how you have used them in a previous project?** HOCs are functions that take in a function and return a new modified function with added functionality. Kinda like using decorators or middlewares. In React, a very common use case was using them to add authentication checks for protected routes to check for user authentication before rendering the route. Also another big use for them is for writing error boundaries, which is probably a lot more common nowadays than the Auth use case since the Auth logic will most likely be encapsulated in a hook instead.

- **How should we store the authorization token from the authentication server in the frontend react app in the safest way for authorization?** The safest way to store auth tokens will be through `HttpOnly` cookies since they are not accessible by JavaScript. Also `localStorage` and `sessionStorage` are two other options but they can be accessed by JavaScript which will make them more vulnerable. Of course storing the tokens in state or in any other way through JavaScript will not be any safer.

## Some Notes About the App

- I would normally use RTK Query as the app uses Redux Toolkit already, but to use `axios` along with it RTK, I created a similar flow using the `createAsyncThunk` function from RTK. Another way to use axios along with RTK would have been to modify the `baseQuery` of RTK Query, but I decided to be more explicit about the use of `axios` for the case.
- The context to use Auth0 is handled by the Auth0 sdk with `Auth0Provider`, which should satify the requirement of handling the user state with context.
