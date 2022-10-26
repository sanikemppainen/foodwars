import axios from 'axios'

const baseUrlGood='http://localhost:3001/api/goodfoods'
const baseUrlBad='http://localhost:3001/api/badfoods'

const getAllGood=()=>{
    return axios.get(baseUrlGood)
}
const getAllBad=()=>{
    return axios.get(baseUrlBad)
}

export default{
    getAllGood,
    getAllBad
}