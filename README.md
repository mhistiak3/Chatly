
# Chatly

Chatly is a multifunctional chat application designed to provide seamless real-time communication. This application supports individual and group chats, with an intuitive interface for managing chats and groups.

## Features

- Real-time messaging
- Group chat creation and management
- User authentication and session management
- Customizable chat UI

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or above)
- [MongoDB](https://www.mongodb.com/) (for the database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mhistiak3/Chatly.git
   cd Chatly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment variables**

   Create a `.env` file in the root directory and add your configuration:

   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application**
   ```bash
   npm start
   ```

   The application should now be running on [localhost:3000](http://localhost:3000).

## Tech Stack

- **Frontend:** React, Material UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT

## Contributing

Feel free to open issues or create pull requests if you’d like to contribute to Chatly!
