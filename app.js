// definició de la variable buto que fem servir per entrar a JS
var calc_btn= document.getElementById("calc-btn")

// Definició de les variables que representen les caselles que haurem d'omplir 

var list_subTotals = []
var list_inputs = []

var click_times = 0 // Comptador de numero de jugadors

// Definicó del que passa quan premem el butó Calcular
calc_btn.addEventListener("click", function() {
    
    // Obrim un for per simplificar la crida de la funció
    for (var p=0; p<click_times; p++){  // la var p representa els players
        for (var r=0; r<9; r++){  // la var r representa les rounds
            
            // Quan r=-1 donaria error, perquè no hi ha previ a la primera ronda
            if(r == 0) {
                calc_sum(list_subTotals[p][r], list_inputs[p][r])
            }

             // Crida de la funció per al calcul dels subtotals per la resta de rondes
            else{
                calc_sum(list_subTotals[p][r], list_inputs[p][r], list_subTotals[p][r-1])
            }
        }
    }
})

// Funció per fer el calcul d'afegir la nova puntuació al subtotal de la ronda anterior
function calc_sum(cell, to_add, previous="empty"){
    
    if(previous == "empty" && document.getElementById(to_add).value.length != 0) {
        cell.innerHTML = parseInt(document.getElementById(to_add).value)
    }
    else if(document.getElementById(to_add).value.length != 0){
        cell.innerHTML = parseInt(previous.innerHTML) + parseInt(document.getElementById(to_add).value)
    }
}

// Codi per afegir nou jugador
var addPlayer_btn= document.getElementById("add-player-btn")

var tr_list = document.querySelectorAll("tr")
var list_rounds = []

for (var i=2; i< tr_list.length; i++){
    list_rounds.push(tr_list[i].id)
}

addPlayer_btn.addEventListener("click", function() {

    let name = prompt("Entra nom jugador:")
    click_times = click_times + 1
    addPlayer_columns(click_times, name)
})

function addPlayer_columns (NumPlayer, name){
    document.getElementById("col-grouping").innerHTML = document.getElementById("col-grouping").innerHTML + 
                `<col id="col-player3-1" class="col-player">
                <col id="col-player3-2" class="col-player col-rightborder">`
    document.getElementById("t-header").innerHTML = document.getElementById("t-header").innerHTML + `<th colspan="2">${name}</th>`
    document.getElementById("t-round").innerHTML = document.getElementById("t-round").innerHTML + 
                `<td>Ronda</td>
                 <td>Subtotal</td>`
    
    var new_pl_inputs = []
    var new_pl_subTotals = []
    for(var r=0; r<list_rounds.length; r++ ){
        
        //Creem la cel.la de l'input
        var td_r = document.createElement("td")
        var input_r = document.createElement("input")
        input_r.setAttribute('type', 'number')
        input_r.id = `r${r+1}-p${NumPlayer}`
        input_r.classList = "cell-in"
        td_r.appendChild(input_r)
        
        new_pl_inputs.push(input_r.id)

        document.getElementById(list_rounds[r]).appendChild(td_r)

        //Creem la cel.la del subtotal
        var td_st = document.createElement("td")
        td_st.id = `st${r+1}-pl${NumPlayer}`
        td_st.innerHTML = 0

        new_pl_subTotals.push(td_st)
        document.getElementById(list_rounds[r]).appendChild(td_st)

    }

    list_inputs.push(new_pl_inputs)
    list_subTotals.push(new_pl_subTotals)
}
    
