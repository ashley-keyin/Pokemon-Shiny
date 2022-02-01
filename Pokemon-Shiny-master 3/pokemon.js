function main(){

    /* Setting up reading the html counter and the actual counter number */
    
    let index = localStorage.getItem('selectedIndex')
    let pokemons = JSON.parse(localStorage.getItem('hunting_pokemon'));
    let selected_mon = pokemons[index]

    let pokemon_sprite = document.querySelector("#pokemon_sprite");
    pokemon_sprite.src = selected_mon["sprite_image"];

    let sprite_anchor = document.querySelector("#sprite_anchor");
    sprite_anchor.href = selected_mon["href"];

    let counter = document.querySelector("#counter");
    let counter_num = selected_mon["number_seen"];

    let site_name = document.querySelector("#site_name");

    counter.innerHTML = counter_num;


    /* Setting up maths for later use in current hunting stats */

    //let to_90 = 18858 - counter_num;    Possible Later Addition

    let random


    /* Function for changing the numbers upon clicking the counter */

    function btnPlusOnClick(e){
        counter_num = counter_num + 1;
        binomialDistribution();
        random = Math.floor(Math.random() * 301)
        if(random == 0){
            counter.innerHTML = counter_num
            random_message = Math.floor(Math.random() * encouraging_message.length)
            site_name.innerHTML = encouraging_message[random_message]
        }else{
            counter.innerHTML = counter_num;
            site_name.innerHTML = "Shiny Tracker"
        }

        pokemons[index]["number_seen"] = counter_num;
        localStorage.setItem("hunting_pokemon", JSON.stringify(pokemons));
    }

    let btn_plus = document.querySelector("#btn_plus");
    btn_plus.addEventListener("click", btnPlusOnClick);


    /* Function for minus button changing the number */

    function btnMinusOnClick(){
        counter_num = counter_num - 1;
        if (counter_num < 0){
            counter_num = 0;
        };
        binomialDistribution();
        counter.innerHTML = counter_num;
        pokemons[index]["number_seen"] = counter_num;
        localStorage.setItem("hunting_pokemon", JSON.stringify(pokemons));
    }

    let btn_minus = document.querySelector("#btn_minus");
    btn_minus.addEventListener("click", btnMinusOnClick);


    /*  Function for Complete Button  */

    let complete_pokemon_list = [];

    function onCompleteButtonPress(){
        if(localStorage.getItem("complete_pokemon") === null){
            complete_pokemon_list.push(selected_mon);
            localStorage.setItem("complete_pokemon", JSON.stringify(complete_pokemon_list));
        }else{
            let previous_complete = JSON.parse(localStorage.getItem("complete_pokemon"));
            for(let index = 0; (index < previous_complete.length); index++){
                let item = previous_complete[index];
                complete_pokemon_list.push(item);
            }
            complete_pokemon_list.push(selected_mon);
            localStorage.setItem("complete_pokemon", JSON.stringify(complete_pokemon_list));
        };
        pokemons.splice(index, 1);
        localStorage.setItem("hunting_pokemon", JSON.stringify(pokemons)); // Remove Selected Pokemon After Completion
        window.location.replace("completed.html");
    }

    let complete_button = document.querySelector("#btn_complete");
    complete_button.addEventListener("click", onCompleteButtonPress);


    /* Function for calculation binomial distribution */

    let bnd_table = document.querySelector("#tb6");

    function binomialDistribution(){
        let temporary_num = (1-(1/8192));
        let exponential_num = Math.pow(temporary_num, counter_num);
        let binomial_distribution_decimal = 1 - exponential_num
        let binomial_distribution_percent = binomial_distribution_decimal * 100
        bnd_table.innerHTML = binomial_distribution_percent.toFixed(2) + "%"
    }

    binomialDistribution();
    /* Get current date */
    
    let date_area = document.getElementById("tb2");

    if(selected_mon["date"] === ""){
        let today = new Date();

        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        selected_mon["date"] = mm+'/'+dd+'/'+yyyy;
        date_area.innerHTML = selected_mon["date"];
    }else{
        date_area.innerHTML = selected_mon["date"];
    };
}

const encouraging_message = [
    "Keep Going!",
    "You Can Do It!",
    "Don't Give Up Yet!",
    "Please God Keep This Site In Fullscreen It Doesn't Scale",
    "Maybe One Day I Will Complete All This",
    "Chosen One, Right Now I Feel More Like The Frozen One! - Ash Ketchum",
    "Hi! I Like Shorts! They're Comfy And Easy To Wear!",
    "Hey, I Know. I’ll Use My Trusty Frying Pan As A Drying Pan",
]


window.addEventListener("load", main)