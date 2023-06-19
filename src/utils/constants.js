import taskImage from "../assets/no-img.png";

export const TASKS = [
    {
        id: 1,
        title: "Task 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur deleniti ducimus id ipsam ipsum labore, laboriosam nam nulla numquam obcaecati optio quaerat quam quasi quo, quos sint suscipit vel.",
        image: "https://cdn.pixabay.com/photo/2023/05/16/12/14/nature-7997402_1280.jpg",
        done: true
    },
    {
        id: 2,
        title: "Task 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur deleniti ducimus id ipsam ipsum labore, laboriosam nam nulla numquam obcaecati optio quaerat quam quasi quo, quos sint suscipit vel.",
        done: false

    },
    {
        id: 3,
        title: "Task 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur deleniti ducimus id ipsam ipsum labore, laboriosam nam nulla numquam obcaecati optio quaerat quam quasi quo, quos sint suscipit vel.",
        image: taskImage,
        done: false

    },
    {
        id: 4,
        title: "Task 4",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur deleniti ducimus id ipsam ipsum labore, laboriosam nam nulla numquam obcaecati optio quaerat quam quasi quo, quos sint suscipit vel.",
        image: taskImage,
        done: true,
    },
];

export const TASKS_URL = (userID) => `https://647ee5e9c246f166da8f9876.mockapi.io/spa/users/${userID}/task/`;