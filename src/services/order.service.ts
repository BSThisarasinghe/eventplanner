import mockdata from '../data/mockdata.json';

const getMockdata = () => {
    return Promise.resolve(mockdata);
};

export {
    getMockdata
}