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
            <i class="fa-solid fa-copy card-copy-btn"
             onclick="copyToClipboard(this.closest('.card').dataset.color);addNotification('Copied !',1);"

             ></i>
            <i class="fa-solid fa-heart card-like-btn"></i>
        </div>
        <div class="card-title">${colorname}</div>
    `;

    colors_section.prepend(card);
}


function generateColor(){
    color_name = search_input.value.trim();
    if(color_name==""){
        addNotification("Empty",3);
        return;
    } 
    if(color_name.length>200){
        addNotification("Too long",3);
        return;
    }   

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


function addNotification(msg,type){
    // <div class="toast">
    //     <i class="fa-solid fa-check"></i>
    //     <span>copied!</span>
    // </div>

    var toast = document.createElement("div");
    toast.className = 'toast';
    if(type==1){
        toast.innerHTML=`<i class="fa-solid fa-check" style='background:#52E62B'></i>`;
    }
    else if(type==3){
        toast.innerHTML=`<i class="fa-solid fa-close" style='background:red'></i>`;
    }
    toast.innerHTML+=`<span>${msg}</span>`;
    toast_container.append(toast);

    setTimeout(()=>{
        toast.remove();
    },1000*2);
}

// addNotification('msg','success');