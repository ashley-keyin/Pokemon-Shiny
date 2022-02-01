function main(){


    // Stats Functions \\

    let total_caught = 0
    let average_encounters = 0
    let total_encounters = 0

    if(localStorage.getItem("complete_pokemon") !== null){
        completed_pokemon = JSON.parse(localStorage.getItem("complete_pokemon"));
        for(index = 0; (index < completed_pokemon.length); index++){
            let pokemon = completed_pokemon[index];
            total_caught++;
            total_encounters += pokemon["number_seen"];
            average_encounters = Math.round(total_encounters / total_caught);
        };
    }else{
        total_caught = 0;
        average_encounters = 0;
        total_encounters = 0;
    };


    // d \\

    let total_caught_div = document.querySelector("#total-caught");
    let average_encounters_div = document.querySelector("#average-encounters");
    let total_encounters_div = document.querySelector("#total-encounters");

    total_caught_div.innerHTML = total_caught;
    average_encounters_div.innerHTML = average_encounters;
    total_encounters_div.innerHTML = total_encounters;
}

window.addEventListener("load", main)