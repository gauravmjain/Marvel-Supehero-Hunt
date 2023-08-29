let apilink = "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=638c14cf4cd50f56c700e7ed9c64343a&hash=7bae03b126a3231efee0657dc2981353";

function apiCall (){
    $.ajax({
        url : apilink,
        method : 'get',
        success: function(data){
            $("#footer-message").html(data.attributionHTML); 
            let characters = data.data.results;
            if(localStorage.length > 0){
                for (let i = 0;i < characters.length; i++){
                    if(localStorage.getItem(characters[i].id)){
                        let imagePath = {
                            path : characters[i].thumbnail.path,
                            variants : "/portrait_incredible.",
                            ext :  characters[i].thumbnail.extension
                        }
                        let charDiv = "<div id = '"+characters[i].id+"' class = 'hero-box'></div>";
                        $("#heros-container").append(charDiv);
                        $('#'+characters[i].id).append("<img  class = 'hero-image'>");
                        $('#'+characters[i].id +" .hero-image").attr('src',imagePath.path+imagePath.variants+imagePath.ext);
                        $('#'+characters[i].id).append("<div class = 'hero-name'>"+characters[i].name+"</div>"); 
                        
                        
                        // Hero Info

                        function heroInfo(e){
                            let idOFHero = e.target.parentElement.id;
                            
                            for(let i = 0; i < characters.length; i++){
                                if(characters[i].id == idOFHero){
                                    let disc = characters[i].description;
                                    let stories = characters[i].stories.available;
                                    let comics = characters[i].comics.available;
                                    let name = characters[i].name;
        
                                    let img  = {
                                        path : characters[i].thumbnail.path,
                                        variants : "/landscape_incredible.",
                                        ext :  characters[i].thumbnail.extension
                                    }
                                    $("#hero-name h3").html(name);
                                    $("#discription .text").html(disc);
                                    $("#comics p span").html(comics);
                                    $("#stories p span").html(stories);
                                    $("#hero-image img").attr('src',img.path+img.variants+img.ext);
                                    $("#remove-favorite").attr("data-id",idOFHero);
                                }
                            }
                            
                            $("#hero-info").css({"width":"464px","height":"550px"})
                        }
        
                        $("#"+characters[i].id+" .hero-image").click(heroInfo);
                        $("#"+characters[i].id+" .hero-name").click(heroInfo);
                    
                    }
                }
            }           
        }
    })
}
apiCall();
    

function removeHeros(){
    $("#heros-container").html("");
}
    
function closeInfoTab(){
    $("#hero-info").css({"width":"0px","height":"0px"})
}

$("#close-info").click(closeInfoTab);


function removeFavourite(event){
 
    let idOfHero = event.target.parentElement.getAttribute("data-id");
    console.log(event.target.parentElement);
    localStorage.removeItem(idOfHero);
    closeInfoTab();
    removeHeros();
    apiCall();
    alert("Character removed")
}


$("#remove-favorite i").click(removeFavourite);


