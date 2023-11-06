import axios from 'axios';

const getEventImages = () => {
    return axios({
        method: `get`,
        url: `https://jsonplaceholder.typicode.com/photos`,
    });
};

const getUsers = () => {
    return axios({
        method: `get`,
        url: `https://jsonplaceholder.typicode.com/users`,
    });
};

const getPosts = () => {
    return axios({
        method: `get`,
        url: `https://jsonplaceholder.typicode.com/posts`,
    });
};

const getComments = () => {
    return axios({
        method: `get`,
        url: `https://jsonplaceholder.typicode.com/comments`,
    });
};

export {
    getEventImages,
    getUsers,
    getPosts,
    getComments
}