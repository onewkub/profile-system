import createHttpRequest from '../utils/createHttpRequest';

const apiURL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:5080/api'
        : process.env.REACT_APP_API_URL as string;


const httpRequest = createHttpRequest(apiURL);

export default httpRequest;
