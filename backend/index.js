const path=require("path")
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
const fs = require("fs");

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
    return valuesList
    } catch (error) {
        console.log('error reading the file', error.message)
    }
}

function translate(){
    const data= fs.readFileSync('./fooddata/foodname_EN.csv', 'utf-8')
    data.split(/\r?\n/).forEach(row=>{
        const fullRow=row.split(';')
        const foodId=parseInt(fullRow[0])
        const foodNameEn=fullRow[1]
        if(foodNameEn===undefined){
            return
        }
        const temp=foodNameEn.split(",")
        goodFoodsValues.map(food=>{
            if(foodId===food.id){
                food.name=temp[0]
            }
        })
        badFoodsValues.map(food=>{
            if(foodId===food.id){
                food.name=temp[0]
            }
        })    })
}

goodFoodsValues=getNutritionalValues('goodFoods')
badFoodsValues=getNutritionalValues('badFoods')
winners=[]
translate()
app.use(express.static(path.join(__dirname, "public")));

app.get('/api/goodfoods', (request, response)=>{

    response.send(goodFoodsValues)
})
app.get('/api/goodfoods/:id', (request, response)=>{
    const id=Number(request.params.id)
    const food=goodFoodsValues.find(food=>food.id===id)
    response.json(food)
})
app.get('/api/badfoods', (request, response)=>{

    response.send(badFoodsValues)
})
app.get('/api/badfoods/:id', (request, response)=>{
    const id=Number(request.params.id)
    const food=badFoodsValues.find(food=>food.id===id)
    response.json(food)
})

//for future development
app.get('/api/winners', (request, response)=>{
    const winner=request.body
    if(winner.id){
        winners=winners.concat(winner)
    }
    response.json(winners)
})


const PORT= process.env.PORT ||3001
app.listen(PORT, ()=>{
    console.log(`server on port: ${PORT}`)
})


app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
  