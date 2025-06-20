const restaurant = [];
// R A N D O M L Y    G E N E R A T I N G    D A T A    F O R    1 0 0   R E S T A U R A N T S

const images = ["First", "second", "third", "fourth", "fifth", "sixth", "seventh", "Eigth", "nine", "tenth"];
const foodTypes = ["Indian","Chinese","Italian","Mexican","American","Japanese","Thai","French","Mediterranean","Korean"];
    
const rest_name = ["Spice Junction","The Urban Tandoor","Curry & Crust","Ocean's Delight","Saffron Grill","The Hungry Fork","Masala Magic",
    "The Noodle House","Tikka Town","Biriyani Bliss","The Wok Way","Grill & Greens","Flame Street","The Yellow Chilli","Cafe Basilico",
    "Chaat Central","Pasta Fiesta", "The Gourmet Spot","Thali Express","Momo Station"];

const delhiRestaurantLocations = ["Hauz Khas Village","Cyber Hub (Gurugram)","Khan Market","Saket","Lajpat Nagar","Connaught Place","Jangpura",
                                    "Defence Colony","Vasant Kunj","Greater Kailash"];
   
                                    
for(let i=0; i<100; i++){
    
    const obj = {};

    obj['image'] = images[Math.floor(Math.random()*10)];
    obj["name"] = rest_name[Math.floor(Math.random()*20)];
    obj['rating'] = Math.floor(Math.random()*5 + 1); //out of 5
    obj['food_type'] = foodTypes[Math.floor(Math.random()*10)];
    obj['price_for_two'] = Math.floor(Math.random() *9301 + 200);  // price range 200 - 9,500
    obj['location'] = delhiRestaurantLocations[Math.floor(Math.random()*10)]; 
    obj['dist_from_home'] = (Math.random()*10 + 1).toFixed(1);
    obj['offers'] = Math.floor(Math.random()*30); //upto 30%off
    obj['alcohol'] = Math.random() > 0.7;  //70% restaurants me no alcohol serving, only 30% me alcohol available (boolean store hogi)
    obj['rest_open_time'] =Math.floor(Math.random() *16 + 8);  //8 bje se 23: 00 tk
    obj['close_time'] = (obj['rest_open_time'] + 12) % 24; //khulne ke 12 ghante bad band ho jayegi

    restaurant.push(obj);
}
// Converting array to JSON
const restaurantJSON = JSON.stringify(restaurant);
console.log(restaurantJSON);



// G E N E R A T I N G    C A R D S 

function getRestaurant(restaurants){

    const root = document.getElementById('root');

    restaurants.forEach(element => {

        //Create a Card (format of div)
        //1. Image
        //2. Card content:
            // a. Card_header (restaurant name and rating)
            // b. Card_footer (Food type and price)
            // c. Card_location (location, distance_from_home)

        // create a card
        const card = document.createElement('div');
        card.classList.add('card'); //adds css styling 

        // create Image
        const image = document.createElement('img');
        image.src = `./Images/${element.image}.jpeg`;



        //card content
        const card_content = document.createElement('div');
        card_content.classList.add('card-content');



            //card header
            const card_header = document.createElement('div');
            card_header.classList.add('card-header');

                //restaurant_name and rating
                const h3 = document.createElement('h3');
                h3.textContent = element.name;

                const rate = document.createElement('span');
                rate.textContent = `${element.rating} ★`;
                rate.classList.add('rating');

                card_header.append(h3, rate);


            
            //card footer
            const card_footer = document.createElement('div');
            card_footer.classList.add('card-footer');

                //food_type and price
                const food_type = document.createElement('span');
                food_type.textContent = element.food_type;

                const price = document.createElement('span');
                price.textContent = `₹ ${element.price_for_two}`;

                card_footer.append(food_type, price);



            //card location
            const card_location = document.createElement('div');
            card_location.classList.add('card-location');

                //location and distance_from_home
                const location = document.createElement('span');
                location.textContent = element.location;

                const distance_from_home = document.createElement('span');
                distance_from_home.textContent = `${element.dist_from_home} km`;

                card_location.append(location, distance_from_home);


    card_content.append(card_header, card_footer, card_location);

    card.append(image, card_content);
    

    root.appendChild(card);
        
    });
}


getRestaurant(restaurant);


//ALCOHOL FILTER
document.getElementById('Alcohol').addEventListener('click', ()=>{
    const result = restaurant.filter(obj => obj.alcohol);
    document.getElementById('root').replaceChildren();
    getRestaurant(result);
})

//RATING 4.5+ FILTER
document.getElementById('Rating').addEventListener('click', ()=>{
    const result = restaurant.filter(obj => obj.rating > 4.5);
    document.getElementById('root').replaceChildren();
    getRestaurant(result);
})
//--------------------------------------------------------------------------------------------------

//  APPLYING THE FILTER FOR SORTING BASED ON RATING, PRICE, DISTANCE    

// When clicking on Filters button
document.getElementById('Filters').addEventListener('click', ()=>{
    document.getElementById('filterPopup').classList.remove('hidden');
})
// When clicking on Close button
document.getElementById('closeFilter').addEventListener('click', ()=>{
    document.getElementById('filterPopup').classList.add('hidden');
    
})
//When clicking on Apply button
document.getElementById('applyFilter').addEventListener('click', (e)=>{
    const element = document.querySelector('input[name = "filterOption"]:checked');
    const ans = element.value;

    if(ans == 'rating') restaurant.sort((a, b)=> b.rating - a.rating); //highest to lowest
    if(ans == 'highLow') restaurant.sort((a, b)=> b.price_for_two - a.price_for_two); // cost highest to lowest
    if(ans == 'costLowHigh') restaurant.sort((a, b)=> a.price_for_two - b.price_for_two); // cost lowest to highest 
    if(ans == 'distance') restaurant.sort((a, b)=> a.dist_from_home - b.dist_from_home); // distance nearest to farthest 

    document.getElementById('root').replaceChildren();
    getRestaurant(restaurant);

    document.getElementById('filterPopup').classList.add('hidden');
    
    
})
//---------------------------------------------------------------------------------------------------

//OPEN NOW FILTER
document.getElementById('Open').addEventListener('click', ()=>{
    const time = new Date().getHours();
    const result = restaurant.filter(obj => obj.rest_open_time <= time && obj.close_time >= time);
    document.getElementById('root').replaceChildren();
    getRestaurant(result);
    
})

// OFFERS MORE THAN 20% FILTER
document.getElementById('Offers').addEventListener('click', ()=>{
    const result = restaurant.filter(obj => obj.offers > 20);
    document.getElementById('root').replaceChildren();
    getRestaurant(result);
})

