import { Axios } from 'axios';
export default function Post(path, param) {
    const request = new Axios({
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return request.post(path, JSON.stringify(param))
}