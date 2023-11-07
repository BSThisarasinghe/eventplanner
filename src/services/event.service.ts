import axios from 'axios';
import { API_URL} from "@env";

const getEventImages = () => {
    return axios({
        method: `get`,
        url: `${API_URL}/photos`,
    });
};

const getUsers = () => {
    return axios({
        method: `get`,
        url: `${API_URL}/users`,
    });
};

const getPosts = () => {
    return axios({
        method: `get`,
        url: `${API_URL}/posts`,
    });
};

const getComments = () => {
    return axios({
        method: `get`,
        url: `${API_URL}/comments`,
    });
};

export {
    getEventImages,
    getUsers,
    getPosts,
    getComments
}