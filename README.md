# Hit Me Up

### [1] See Live Version Immediately
If you're in a hurry, you can either scroll down to see the screenshots and glance through this README file, or head over to this link (https://hitmeup-social.herokuapp.com/login) and check it out using credentials in the next point.

### [2] Demo Credentials (also included in login page)
* Email: masteruser@email.com
* Password: Masteruser975

### [3] Introduction
Hit Me Up is a full stack web application built using Next.js, Socket.io, Node.js and other cool technologies and APIs. It is a social media app and the main tech in this project are Next.js and Socket.IO which is used to create bidirectional communication between users to implement chat and notifications. It has all the typical features you'd see in a social media such as resetting password, uploading a pic (even cropping them before uploading), commenting, liking, and so on. All the features aren't discussed in this README as it will get long and complicated. Check it out to learn more.

### [4] Technologies Used/Features Implemented
* Next.js
* Axios
* Express.js
* JWT
* Mongoose
* SendGrid API (for password reset feature where link to reset password would be mailed to users who forgot their passwords)
* React
* Infinite scroll feature
* Image cropping feature before uploading post
* Popup notifications
* Semantic UI React
* Socket.IO

### [5] Screenshots

![Mohmed Ishak](https://user-images.githubusercontent.com/52876913/136593564-50144f55-5833-4eb1-a52b-cd2cc7f7d83d.png)
![Mohmed Ishak](https://user-images.githubusercontent.com/52876913/136593575-8da1319b-8db9-4198-89f6-f0c48621e4d1.png)
![Mohmed Ishak](https://user-images.githubusercontent.com/52876913/136593583-d093d16b-cbe9-4a8e-88db-77e34a3d581d.png)

### [6] How To Run The Project Locally
If you want to just see the live version, refer point 1. Otherwise keep reading. Make sure you have got Node.js runtime environment and MongoDB installed on your machine. Fork this repository. Add a `.env` file in your project with the following content.
    
    MONGO_URI=mongodb://localhost:27017/temporaryDB
    JWT_SECRET_KEY=fakekey
    SENDGRID_API=
    NODE_ENV=development
    PORT=3000
You need to get an API key from SendGrid API and add the value to the respective key in the `.env` file. If you don't know how, Google it. I don't want to make this README file look long and complicated. Also, in `next.config.js`, replace the CLOUDINARY_URL with your own Cloudinary URL which you need to get from Cloudinary. If you don't know how, Google it. ;) Install all dependencies and run the development server with `npm run dev`.

### [7] Hosting
* Frontend: Heroku
* Backend: Heroku
* Database: MongoDB Atlas
