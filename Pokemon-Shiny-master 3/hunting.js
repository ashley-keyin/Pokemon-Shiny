/* Javascript for the hunting list page */

import {pokemon_list as pokemon_list} from "./all_pokemon.js"

function main(){  

    let copied_pokemon_list = JSON.parse(JSON.stringify(pokemon_list));
    

    if(localStorage.getItem("hunting_pokemon") !== null){
        var hunting_list = JSON.parse(localStorage.getItem("hunting_pokemon"));
    }else{
        var hunting_list = []
    };


    /* Add Pokemon button */
    
    let confirm_button = document.querySelector("#confirm_button");
    let add_pokemon_button = document.querySelector("#add_pokemon");
    let cancel_button = document.querySelector("#btn-cancel");

    function onAddButtonClick(){
        document.getElementById("myForm").style.display = "block";
    }

    add_pokemon_button.addEventListener("click", onAddButtonClick)


    /* Auto add pokemon to dropdown options */

    for(let i in pokemon_list){
        let new_mon_option = document.createElement("option");
        new_mon_option.value = pokemon_list[i].name;
        new_mon_option.innerHTML = pokemon_list[i].name;
        document.querySelector("#pokemon_dropdown").appendChild(new_mon_option);
    }


    /*Function to add pokemon to hunting list*/

    function onConfirmButtonClick(){
        let new_mon = document.querySelector("#pokemon_dropdown").value;
        for(let i in pokemon_list){
            if(pokemon_list[i].name === new_mon){
                let new_mon_object = copied_pokemon_list[i];
                new_mon_object["number_seen"] = 0;
                new_mon_object["date"] = "";
                hunting_list.push(new_mon_object);
                localStorage.setItem("hunting_pokemon", JSON.stringify(hunting_list));
            }
        }
        location.reload();
        closeForm();
    }

    confirm_button.addEventListener("click", onConfirmButtonClick);

    function onCancelButtonClick(){
        closeForm();
    }

    cancel_button.addEventListener("click", onCancelButtonClick);


    let pokemon_button_list = document.querySelector("#hunting_list");

    if(localStorage.getItem("hunting_pokemon") !== null){
        var hunting_pokemon = JSON.parse(localStorage.getItem("hunting_pokemon"))
        for(let item_index = 0; (item_index < hunting_pokemon.length); item_index++){
            let item = hunting_pokemon[item_index];
            let button = document.createElement('button')
            button.className = "list_buttons";
            button.innerHTML = `${item['name']} · ${item['number_seen']}`;
            pokemon_button_list.appendChild(button);
            button.addEventListener('click', function(){
                localStorage.setItem('selectedIndex', item_index);
                window.location.replace('pokemon.html');
            })
        }
    }



    function closeForm() {
        document.getElementById("myForm").style.display = "none";
      }

}

window.addEventListener("load", main);
