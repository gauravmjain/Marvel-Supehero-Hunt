
let apikey = "?ts=1&apikey=638c14cf4cd50f56c700e7ed9c64343a&hash=7bae03b126a3231efee0657dc2981353";
let apilink = "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=638c14cf4cd50f56c700e7ed9c64343a&hash=7bae03b126a3231efee0657dc2981353";
console.log("inside")
let onScreen = new Array ();

function allHeros (){
    $.ajax({
        url : apilink,
        method : 'get',
        success: function(data){
            $("#footer-message").html(data.attributionHTML);  
            let characters = data.data.results;
            for (let i = 0; i < characters.length; i++){
                // console.log(characters[i].name);
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
                
                // Detail window 

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
                            $("#add-favorite").attr("data-id",idOFHero);
                        }
                    }
                    
                    $("#hero-info").css({"width":"464px","height":"550px"})
                }

                $("#"+characters[i].id+" .hero-image").click(heroInfo);
                $("#"+characters[i].id+" .hero-name").click(heroInfo);
            
            }      
        },
        error : function (){
            console.log("failed")
        }
    })    
}

allHeros();     

// Event Listen for heros Card

function closeInfoTab(){
    $("#hero-info").css({"width":"0px","height":"0px"})
}

$("#close-info").click(closeInfoTab);


function addFavourite(event){
    let idOfHero = event.target.parentElement.getAttribute("data-id");
    localStorage.setItem(idOfHero,true);
    alert("Added to Favorite")
}


$("#add-favorite i").click(addFavourite);



function removeHeros(){
    $("#heros-container").html("");
    onScreen = [];
}

// Search Bar
function searchAllCharacters(data){
    let filter = document.querySelector("#search-area input");
    let searchedName = filter.value.toLowerCase();
    removeHeros();
    // console.log(filter.value);
    if(filter.value.length > 0){
        $.ajax({
            url : apilink,
            method : "get",
            success : function(data){
                let characters = data.data.results;
                for (let i = 0; i < characters.length; i++){
                    let characterName = characters[i].name.toLowerCase();
                    if(characterName.startsWith(searchedName) && !onScreen.includes(characters[i].id)){
                        // console.log(characterName+" "+searchedName);
                        onScreen.push(characters[i].id);
                        let imagePath = {
                            path : characters[i].thumbnail.path,
                            variants : "/portrait_incredible.",
                            ext :  characters[i].thumbnail.extension
                        }
                        let charDiv = "<div id = '"+characters[i].id+"' class = 'hero-box'></div>";
                        $("#heros-container").append(charDiv);
                        $('#'+characters[i].id).append("<img  class = 'hero-image' src = "+imagePath.path+imagePath.variants+imagePath.ext+">");
                        $('#'+characters[i].id).append("<div class = 'hero-name'>"+characters[i].name+"</div>"); 
                         // Detail window 

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
                                    $("#add-favorite").attr("data-id",idOFHero);
                                }
                            }
                            
                            $("#hero-info").css({"width":"464px","height":"550px"})
                        }

                        $("#"+characters[i].id+" .hero-image").click(heroInfo);
                        $("#"+characters[i].id+" .hero-name").click(heroInfo);                              
                    }
                }            
            }
        })   
    }else{
        allHeros();
    }

}

$("#search-area input").keyup(searchAllCharacters);