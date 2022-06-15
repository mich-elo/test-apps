import axios from 'axios'

const axiosInit = axios.create({ 
    baseURL: `http://localhost:8000/api`,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization' : `Bearer `,
        'Accept':'application/json'
    }
})

async function getTest() {
    try {
      const {data}  = await axiosInit.post('/test');
      console.log(data);
    } catch (error) {
      console.error(error);
    }
}

export {
    getTest
}
