function main(){

    let pokemon_button_list = document.querySelector("#hunting_list");

    if(localStorage.getItem('complete_pokemon') !== null){
        let pokemon_list = JSON.parse(localStorage.getItem('complete_pokemon'));
        for(let item_index = 0; (item_index < pokemon_list.length); item_index++){
            let item = pokemon_list[item_index];
            let button = document.createElement('button')
            button.className = "list_buttons";
            button.innerHTML = `${item['name']} · ${item['number_seen']}`;
            pokemon_button_list.appendChild(button);
            button.disabled = true;
            button.style.cssText = "color: white; background-color: #598FAF;"
        }
    }
}

window.addEventListener("load", main)