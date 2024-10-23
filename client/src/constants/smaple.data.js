export const sampleChats = [
  {
    avatar: [
      "https://avatars.githubusercontent.com/u/65768155?s=400&u=a098e6dfa916a2de76f450576042553f1aa6dfa6&v=4",
    ],
    name: "Istiak Ahammad",
    id: 1,
    groupChat: false,
    members: [1, 2],
    lastMessage: "Hello iA",
  },
  {
    avatar: ["https://avatars.githubusercontent.com/u/583231?s=460&v=4"],
    name: "Octocat",
    id: 2,
    groupChat: false,
    members: [2, 3],
    lastMessage: "Check out the latest GitHub updates!",
  },
  {
    avatar: ["https://randomuser.me/api/portraits/women/68.jpg"],
    name: "Emily Clark",
    id: 3,
    groupChat: false,
    members: [2, 4],
    lastMessage: "Meeting is at 3 PM tomorrow.",
  },
  {
    avatar: [
      "https://randomuser.me/api/portraits/men/75.jpg",
      "https://randomuser.me/api/portraits/men/76.jpg",
      "https://randomuser.me/api/portraits/women/72.jpg",
    ],
    name: "Project Team",
    id: 4,
    groupChat: true,
    members: [1, 3, 4, 5],
    lastMessage: "Let's finalize the report today.",
  },
  {
    avatar: [
      "https://randomuser.me/api/portraits/men/75.jpg",
      "https://randomuser.me/api/portraits/women/72.jpg",
      "https://randomuser.me/api/portraits/men/76.jpg",
      "https://randomuser.me/api/portraits/women/72.jpg",
    ],
    name: "React Team",
    id: 5,
    groupChat: true,
    members: [1, 3, 4, 5],
  },
];

export const smapleUsers = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Smith",
  },
  {
    id: 3,
    name: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    name: "Bob Brown",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];
// Dummy notification data
export const smapleNotifications = [
  {
    id: 1,
    createdAt: "",
    sender: {
      name: "John Doe",
    },
    time: "2 mins ago",
    chatId: "2",
  },
  {
    id: 2,
    createdAt: "",
    sender: {
      name: "iA Coder",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    time: "5 mins ago",
    chatId: "2",
  },
];

export const sampleMessages = [
  {
    id: 1,
    content: "Hi there! How can I help you today?",
    createdAt: "2024-10-24T12:30:00Z", // Example ISO date from MongoDB
    sender: {
      id: "123",
      name: "John Doe",
    },
    attachments: [
      {
        public_id: "1111",
        url: "https://randomuser.me/api/portraits/men/1.jpg",
      },
    ],
  },
  {
    id: 2,
    content: "Yes, please help me find a job.",
    createdAt: "2024-10-24T12:31:00Z", // Example ISO date from MongoDB
    sender: {
      id: "returnedId",
      name: "Jane Smith",
    },
    attachments: [],
  },
  {
    id: 3,
    content: "Sure! What kind of job are you looking for?",
    createdAt: "2024-10-24T12:32:00Z", // Example ISO date from MongoDB
    sender: {
      id: "123",
      name: "John Doe",
    },
    attachments: [],
  },
  {
    id: 4,
    content: "I'm looking for something in software development.",
    createdAt: "2024-10-24T12:33:00Z", // Example ISO date from MongoDB
    sender: {
      id: "returnedId",
      name: "Jane Smith",
    },
    attachments: [],
  },
  {
    id: 5,
    content: "Great! Do you have any experience in specific technologies?",
    createdAt: "2024-10-24T12:34:00Z", // Example ISO date from MongoDB
    sender: {
      id: "123",
      name: "John Doe",
    },
    attachments: [],
  },
  {
    id: 6,
    content: "Yes, I have experience in JavaScript, React, and Node.js.",
    createdAt: "2024-10-24T12:35:00Z", // Example ISO date from MongoDB
    sender: {
      id: "returnedId",
      name: "Jane Smith",
    },
    attachments: [
      {
        public_id: "2222",
        url: "https://randomuser.me/api/portraits/women/2.jpg",
      },
    ],
  },
  {
    id: 7,
    content: "Nice! Have you worked on any projects recently?",
    createdAt: "2024-10-24T12:36:00Z", // Example ISO date from MongoDB
    sender: {
      id: "123",
      name: "John Doe",
    },
    attachments: [],
  },
  {
    id: 8,
    content: "Yes, I built a task management app using MERN stack.",
    createdAt: "2024-10-24T12:37:00Z", // Example ISO date from MongoDB
    sender: {
      id: "returnedId",
      name: "Jane Smith",
    },
    attachments: [],
  },
  {
    id: 9,
    content: "That's impressive! Can you share the project link?",
    createdAt: "2024-10-24T12:38:00Z", // Example ISO date from MongoDB
    sender: {
      id: "123",
      name: "John Doe",
    },
    attachments: [],
  },
  {
    id: 10,
    content: "Sure! Here's the link: https://taskmanager.com",
    createdAt: "2021-10-24T12:39:00Z", // Example ISO date from MongoDB
    sender: {
      id: "returnedId",
      name: "Jane Smith",
    },
    attachments: [
      {
        public_id: "3333",
        url: "https://randomuser.me/api/portraits/women/5.jpg",
      },
    ],
  },
];
