import axios from 'axios'

const baseUrlGood='/api/goodfoods'
const baseUrlBad='/api/badfoods'

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