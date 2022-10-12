import axios from 'axios'

const baseUrl='http://fineli.fi/fineli/api/v1/foods'
//https://fineli.fi/fineli/api/v1/foods?q=omena

const getAll=()=>{
    return axios.get(baseUrl)
}

export default{
    getAll
}