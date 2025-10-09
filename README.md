# PlaytPlus Internship Assignment

A full-stack social media platform where esports organizers can manage scrims and official matches. Built with modern technologies including Next.js, Express, MongoDB, and Cloudinary for media management.

---

## Tech Stack

* Frontend: Next.js
* Backend: Express.js
* Database: MongoDB (via Mongoose)
* Authentication: NextAuth.js with Credentials + Google OAuth
* Image Storage: Cloudinary
* Redux: State managemennt
* RTK: Api calls
* UI: Tailwind CSS + Shadcn UI
* Theme: next-themes for dark/light mode support

---

## Features

* User authentication with JWT, bcrypt-encrypted passwords, and Google OAuth.
* Fully protected backend routes using JWT middleware.
* Posts with images, likes, dislikes, and comments.
* Live comments synced with MongoDB.
* Responsive UI with dark/light theme support.
* Image upload and storage via Cloudinary.

---

## Getting Started

### 1. Clone the repository

```
git clone <repo-url>
cd <repo-root>
```

### 2. Install dependencies

Run separately in frontend and backend folders:

```
npm install
```

### 3. Environment Variables

**Backend (.env):**

```
PORT=8800
MONGO_URI=<YOUR_MONGO_URI>
JWT_SECRET=<YOUR_JWT_SECRET>
JWT_EXPIRES_IN=7
NEXTAUTH_SECRET=<YOUR_NEXTAUTH_SECRET>
CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>
CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>
CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
```

**Frontend (.env.local):**

```
NEXTAUTH_SECRET=<YOUR_NEXTAUTH_SECRET>
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<YOUR_GOOGLE_CLIENT_SECRET>
API_URL=http://localhost:8800
NEXTAUTH_DEBUG=true
GOOGLE_PASSWORD=<YOUR_GOOGLE_PASSWORD>
```

> Note: Replace placeholders with your actual credentials. Do not commit secrets to your repository.

---

### 4. Running the App

**Backend:**

```
npm start
```

**Frontend:**

```
npm run dev
```

Your frontend should now be available at [http://localhost:3000](http://localhost:3000).

---
## Achievements

The project implements the following functionalities:

1. Creating posts
2. Commenting on posts
3. Reporting posts
4. Liking/Disliking posts
5. Creating users
6. Updating user information
7. Showing own profile page
8. Showing other users' profile pages
9. Interface to show stories (story implementation pending)
10. Dark mode support
11. Home page feed
12. OAuth sign-in (Google)
13. Credentials sign-in
14. Landing page, Register, Login, Home, and Profile pages
## Additional Notes

* Passwords are encrypted using bcrypt.
* All backend routes are JWT-protected.
* Cloudinary is used for image uploads and storage.
* UI is built with Tailwind CSS and Shadcn components.
* Theme management is handled by next-themes.




