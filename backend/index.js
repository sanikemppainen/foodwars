const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const fs = require("fs");
const { compileFunction } = require('vm')
const { request } = require('http')
const { response } = require('express')

let goodFoods=[{name: 'Porkkana', id:300}, {name: 'Pähkinä', id: 375}, {name: 'Chili', id:31557}, {name:'Parsakaali', id:324}, {name: 'Puuro', id:1514}, {name: 'Papu', id:31214}]
let goodFoodsValues=[]
let badFoods=[{name: 'Hampurilainen', id:32095}, {name: 'Suklaa', id: 6}, {name: 'Jäätelö', id:668}, {name:'Energiajuoma', id:29070}, {name: 'Pizza', id:32755}, {name: 'Makkara', id:7189}]
let badFoodsValues = []

let foodObj={id:'', name:'', energy:0, cholesterol:0, protein:0, carbs:0, fat:0, delay:0}

function getNutritionalValues(params){
    let list=[]
    let valuesList=[]
    let energy=0
    let cholesterol=0
    let protein=0
    let carbs=0
    let fat=0
    let delay=0
    let foodIdPreviously=0
    let foodNamePreviously=''
    let counter=0

    if (params==='goodFoods'){
        list=goodFoods
        valuesList=goodFoodsValues
    } else if (params==='badFoods'){
        list=badFoods
        valuesList=badFoodsValues
    }
    try{
        const data= fs.readFileSync('./fooddata/component_value.csv', 'utf-8')
        data.split(/\r?\n/).forEach(row=>{
            const fullRow=row.split(';')
            const foodId=parseInt(fullRow[0])
            const valueName=fullRow[1]
            const value=parseInt(fullRow[2])
            list.map(food=>{
                if (food.id === foodId){
                    if (foodIdPreviously!==foodId || counter=== (list.length*5)){
                        foodObj={
                            id: foodIdPreviously,
                            name: foodNamePreviously, 
                            energy:energy, 
                            cholesterol:cholesterol, 
                            protein:protein, 
                            carbs:carbs, 
                            fat:fat, 
                            delay:delay
                        }

                        if(foodIdPreviously!==0){
                            valuesList.push(foodObj)
                            if(counter===(list.length*5)){
                                counter+=1
                            }
                        }                        
                        energy=0
                        cholesterol=0
                        protein=0
                        carbs=0
                        fat=0
                        delay=0
                        
                    }

                    if (valueName ==='ENERC'){
                        energy=(value/4.184).toFixed(2)
                        counter+=1
                    } else if (valueName === 'CHOLE'){
                        cholesterol=value
                        counter+=1

                    } else if (valueName === 'PROT') {
                        protein=value
                        counter+=1

                    } else if (valueName === 'FAT'){
                        fat=value
                        counter+=1

                    } else if (valueName == 'CHOAVL') {
                        carbs=value
                        counter+=1

                    } 
                    delay=carbs+fat+protein
                
                    foodIdPreviously=foodId
                    foodNamePreviously=food.name
                }
        })    
    })
    //console.log(valuesList)
    return valuesList
    } catch (error) {
        console.log('error reading the file', error.message)
    }
}
//getNutritionalValues('goodFoods')
//&console.log(getNutritionalValues('goodFoods'))
//console.log(getNutritionalValues('badFoods'))
goodFoodsValues=getNutritionalValues('goodFoods')
badFoodsValues=getNutritionalValues('badFoods')
winners=[]

app.get('/api/goodfoods', (request, response)=>{
    //response.send('vastaus juureen tehtyihin hakuihin')
    console.log(request.body)
    console.log(response.body)
    response.send(goodFoodsValues)
})
app.get('/api/goodfoods/:id', (request, response)=>{
    const id=Number(request.params.id)
    const food=goodFoodsValues.find(food=>food.id===id)
    response.json(food)
})
app.get('/api/badfoods', (request, response)=>{
    //response.send('vastaus juureen tehtyihin hakuihin')
    console.log(request.body)
    console.log(response.body)
    response.send(badFoodsValues)
})
app.get('/api/badfoods/:id', (request, response)=>{
    const id=Number(request.params.id)
    const food=badFoodsValues.find(food=>food.id===id)
    response.json(food)
})
app.get('/api/winners', (request, response)=>{
    const winner=request.body
    if(winner.id){
        winners=winners.concat(winner)
    }
    response.json(winners)
    console.log(winners)
})


const PORT=3001
app.listen(PORT, ()=>{
    console.log(`server on port: ${PORT}`)
})

