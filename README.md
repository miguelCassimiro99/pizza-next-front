# Pizza Nextjs Front

This project was made using Nextjs and the mainly function provide aproach the display of a github repositories list by user.

How does it works 🔍

- After you realize the login on the app with the right credentials you can access the dashboard page where you’ll find a input for the username.

**Login info:**

```json
"email": "miguel@cassimiro.tech"
"password": "Abc@123"
```

- If the username passed exists, will be displayed a list of repositories from this user. Since it happens, you can store the list clicking on save button or reset the list to clear the state.
- When click on save button, a card with the avatar_url and name will be displayed so you can access in other moment the repo list of this user.

<aside>
💡 The authentication is based on JWT and stored with Cookies

</aside>

### Tools 🛠️

🌐 [Next](https://nextjs.org/)

🌐 [Nookies](https://github.com/maticzav/nookies)

🌐 [Zustand](https://github.com/pmndrs/zustand)

🌐 [Tailwind](https://tailwindcss.com/)

🌐 [Typescript](https://www.typescriptlang.org/)

---

## Features 📜

- [x]  Tailwind integration
- [x]  Login logic
- [x]  Github search
- [x]  Repositories list storage
- [ ]  Use Docker to build the application (💻 working)

---

## Setup 🏗️

This is a [Next.js](https://nextjs.org/) project bootstrapped with `[create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)`.

## Getting Started

First, run the development server:

```
npm run dev
# or
yarn dev

```

Open [http://localhost:3000](http://localhost:3000/) with your browser to see the result.
