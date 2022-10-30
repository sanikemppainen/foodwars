<h1>FOOD WARS </h4>

[LINK TO THE WEBSITE](https://foodwars.fly.dev/)

This project is done for Solidabis code challenge 2022, the brief for the assignment can be found [here](https://koodihaaste.solidabis.com/intro)

### Intro
Food Wars is the ultimate battle to find out which food characters trumps over others. Junk foods with high amounts of energy may seem strong but are there surprising downsides? Are low-caloric foods always the weaker option or do they have hidden abilities you may not have thought about....? These are the questions you can ponder with this game. 

### How to play
Foods are given stats and on the basis of these stats they battle with other foods to find out who is the ultimate fighter. Stats are formed in the following manner, according to the assignment brief: 

| Food Nutritional value       | Game points         
| ------------- |:-------------:| 
| Energy      | Health Points = HP | 
| Protein     | Defence, as a % of opponent's strength      |
| Carbohydrates | Stregnth      |
| Delay     | Fat+Protein+Carbs      |
| Danger Points     | Cholesterol      |

I added Danger Points to give the game a bit more variability.

The game itself is very simple to play, just click: 'start' button which takes you to the ' Choose Player ' view where you can choose two foods you want to battle with. First dropdown menu is for healthier foods and the second is for unhealthy foods. Then just click ' start ' and eatch how the game goes. 

Foods hit their opponent whenever their delay time runs out and the winner is the one that knocks out their opponents HP down to 0 first. There are two exceptions to this: 
  1. Chili has magical capsaicin powers due to it being a spicy food. So if Chili gets enough hits, spicyness levels increases and it wins by turning up the heat on the opponent and making the opponent die from it.
    
    Play Chili VS Energy Drink to see this happen.
  2. Cholesterol is a dangerous compound bound to cause troubles so when a food's cholesterol level rises too high (Danger Points add up every round they hit), the food dies a sudden death due to poor health and the opponent wins. 
    
    Play Broccoli VS Ice Cream to see this happen.

You can replay the game by clixcking ' Play Again ' button

### Tech

The application was built using:
  * React
  * Node.js
  * express
  * HTML
  * CSS

Supertest was used for testing although due to lack of time testing was limited to backend and was quite simple. 

I used Figma to design the layout of the game and the overall structure of the website. Canva was used to make the buttons and logos.

The game was deployed to fly.io
 
Data for the foods was from Fineli's CSV files which were then placed into a backend where the frontend of the app got them from and converted then to characters with game stats or points. For future development, there is ability to scan any food from the csv files and those can be used to play the game but for the purpose of this exercise and for the game to be good foods vs bad foods theme I chose a few foods for both of the good and bad food side. I also translated the food names to English using fineli data that was provided in Engish but due to not wanting to hard code the names to ease future develompment, they are straight from the given data set and can seem a bit funny. For example Energiajuoma translated into Energy Drink With Added Vitamins due to that being the original name in the file. This isn't a problem that would affect the gameplay but maybe isn't the most user-friendly name. 

