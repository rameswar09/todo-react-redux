import axios from 'axios'

const instance = axios.create({
    // baseURL:'http://localhost:3030/'
    baseURL:'https://ramu-todo-app.herokuapp.com/'

})

export default instance