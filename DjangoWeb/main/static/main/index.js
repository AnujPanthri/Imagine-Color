function createColorCard(colorname,color){
    /*
    <div class="card">
        <div class="card-color">

            <i class="fa-solid fa-copy card-copy-btn"></i>
            <i class="fa-solid fa-heart card-like-btn"></i>
        </div>
        <div class="card-title">cool red</div>
    </div>
    */
    
    card = document.createElement("div");
    card.className = "card";
    card.dataset.color=color;
    card.innerHTML=`
        <div class="card-color" style='background:${color}'>
            <i class="fa-solid fa-copy card-copy-btn" onclick="copyToClipboard(this.closest('.card').dataset.color)"></i>
            <i class="fa-solid fa-heart card-like-btn"></i>
        </div>
        <div class="card-title">${colorname}</div>
    `;

    colors_section.prepend(card);
}

// createColorCard("blue");
// createColorCard("red");
// createColorCard("green");
// createColorCard("blue");
// createColorCard("red");
// createColorCard("green");

function generateColor(){
    color_name = search_input.value.trim();
    if(color_name=="")  return;
    if(color_name.length>200)   return;

    data = {
        "color_names":[color_name],
    };

    header = {
        "Content-Type":"application/json",
        // "X-CSRFToken":csrf_token,
    };

    fetch("api/generate",{
        method:"POST",
        headers:header,
        body:JSON.stringify(data),
    }).then(response=>response.json()).then((res)=>{
        // create card for it
        createColorCard(color_name,res['colors'][0]);
    })
}

function copyToClipboard(value){
    navigator.clipboard.writeText(value);
}

function detectOnSubmit(e){
    if(e.key==='Enter' || e.keyCode===13)
        generateColor()
}