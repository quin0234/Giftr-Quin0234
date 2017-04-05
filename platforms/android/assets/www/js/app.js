/****************************************************************************************************

*****************************************************************************************************/
var currentPerson = 0;
var people = [];
var newIdea = 0;
var index = null;

var app = {
    
    init: function() {
        if (!localStorage.getItem("giftr-quin0234")) {
        console.log("No contact data: creating content");
        let first_person = {
            id: Date.now(),
            name: "Paul Quinnell",
            dob: "1984-10-14",
            ideas:[{
            idea: "Samsung GS8",
            store: "Samsung",
            cost: "1000",
            url: "www.samsung.ca"    
        }]
        }
        people.push(first_person);
        localStorage.setItem("giftr-quin0234", JSON.stringify(people));
        }
        try{
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        }catch(e){
            document.addEventListener('DOMContentLoaded', this.onDeviceReady.bind(this), false);
            console.log('failed to find deviceready');
        }
        
        
        },
    
    onDeviceReady: function() {
        window.addEventListener('push', app.pageChanged);
        app.displayPerson();
        document.getElementById("buttonSavePerson").addEventListener("touchstart", app.savePerson);
        document.getElementById("btnCancalPerson").addEventListener("touchstart", app.cancelContactSetup);
        document.getElementById("personName").addEventListener("touchstart", app.editPerson);
        document.getElementById("clear").addEventListener("touchstart", app.clearLocal);    
    },
    
    pageChanged: function(){
        if (document.querySelector('#index')){
        app.displayPerson(); 
        document.getElementById("buttonSavePerson").addEventListener("touchstart", app.savePerson);
        document.getElementById("btnCancalPerson").addEventListener("touchstart", app.cancelContactSetup);    
        document.getElementById("clear").addEventListener("touchstart", app.clearLocal);  
        document.getElementById("personName").addEventListener("touchstart", app.editPerson);
        
        }else {
        document.getElementById("saveGift").addEventListener("touchstart", app.saveGift);
        document.getElementById("cancelBtnGift").addEventListener("touchstart", app.cancelIdeaSetup);    
        app.displayGift();
        }
        },
        
    savePerson: function(){
    let newPerson = {
              id: Date.now(),
              name: document.getElementById("name").value,
              dob: document.getElementById("dob").value,
              ideas: []
          };
          
        people.push(newPerson);
        localStorage.setItem("giftr-quin0234", JSON.stringify(people));
        app.displayPerson();
        app.toggleModalPersonOn();
        //document.getElementById("name").value = "";
        //document.getElementById("dob").value = "";
        console.log(people);
    },
    
    displayPerson: function(){
        document.getElementById("contact-list").innerHTML="";
        people = JSON.parse(localStorage.getItem("giftr-quin0234"));
        people.sort(app.compare);
        let list = document.querySelector('#contact-list');
        
        people.forEach(function(data){
            //console.log(data.id);
            
            let li = document.createElement('li');
            let namep = document.createElement('span');
            let aedit = document.createElement('a');
            aedit.href = "#personModal";
            let agifts = document.createElement('a');
            agifts.href = "gifts.html";
            let dateb = document.createElement('span');
            
            li.className = "table-view-cell";
            namep.className = "pName";
            namep.id = "personName";
            agifts.className = "navigate-right pull-right";
            dateb.className = "dob";
            
            li.appendChild(namep);
            namep.appendChild(aedit);
            li.appendChild(agifts);
            agifts.appendChild(dateb);
            
            let dob = moment(data.dob).format('ll');

            namep.textContent = data.name;
            namep.setAttribute("perID", data.id);
            dateb.textContent = dob;
            list.appendChild(li);
            
            li.addEventListener("touchstart", function(ev){
            currentPerson = namep.getAttribute("perID");
            //console.log(currentPerson);
            app.editPerson(currentPerson);
            }) 
        })
    },
    
        
    editPerson: function(ev) {
    document.getElementById("buttonSavePerson").removeEventListener("touchstart", app.savePerson);
    document.getElementById("buttonSavePerson").addEventListener("touchstart", app.saveEditPerson);
        
    people = JSON.parse(localStorage.getItem("giftr-quin0234"))
    
    people.forEach(function(value){
            if(currentPerson == value.id){
                 document.getElementById("name").value = value.name;
                 document.getElementById("dob").value = value.dob;
            }
        });             
            
    app.toggleModalPersonOn();
    },
    
    
    saveEditPerson: function(ev){
        
    people = JSON.parse(localStorage.getItem("giftr-quin0234"));
        
      people.forEach(function(value){
            if(currentPerson == value.id){
                value.name = document.getElementById("name").value;
                value.dob = document.getElementById("dob").value;
            }
        });   
         
    localStorage.setItem("giftr-quin0234", JSON.stringify(people));
               
    console.log(people);    
    console.log(localStorage);
        
    document.getElementById("buttonSavePerson").removeEventListener("touchstart", app.saveEditPerson);
    document.getElementById("buttonSavePerson").addEventListener("touchstart", app.savePerson);
    
    document.getElementById("name").value = "";
    document.getElementById("dob").value = "yyyy-mm-dd";  
        
    app.toggleModalPersonOn();
    app.displayPerson();    
        
    },
    
    saveGift: function(){
        
        let newIdea = {
        idea: document.getElementById("giftIdea").value,
        store: document.getElementById("store").value,
        url: document.getElementById("url").value,
        cost: document.getElementById("cost").value
        };
        
        people = JSON.parse(localStorage.getItem("giftr-quin0234"));
        people.forEach(function(value){
            console.log(value.id);
            console.log(currentPerson);
            console.log(value.ideas);
            //let giftsIdeas = value.ideas;
            if(currentPerson == value.id){
                value.ideas.push(newIdea);
            }
            else(console.log("No Matching ID"));
        });
        
        localStorage.setItem("giftr-quin0234", JSON.stringify(people));

        app.displayGift();
        app.toggleModalGiftOn();
        }, 
    
    
    
    displayGift: function(ideas){
        document.getElementById("gift-list").innerHTML="";
        let ul = document.getElementById("gift-list");
        people.forEach(function(value1, index1){
        if(value1.id == currentPerson){
                let name = value1.name;
                let nameHeader = document.getElementById("name");
                nameHeader.textContent = "Giftr ideas for " + name;
                
            //console.log(name);
           
            value1.ideas.forEach(function(value2, index2){
            console.log(value2.idea);
            
          let li = document.createElement("li");
                    li.classList.add("table-view-cell");
                    li.classList.add("media");
                    ul.appendChild(li);
                
                let div = document.createElement("div");
                    div.className = "media-body";
                    div.setAttribute("gift-id", value2.idea);
                
                let span = document.createElement("span");
                    span.classList.add("pull-right");
                    span.classList.add("icon");
                    span.classList.add("icon-trash");
                    span.classList.add("midline");
                    span.addEventListener("touchstart", function(){
                    newIdea = div.getAttribute("gift-id");
                    app.deleteIdea(newIdea);
                    });
                    console.log(newIdea + " " + value2.idea)        

                    li.appendChild(span);
                    let a = document.createElement("a");
                    a.textContent = value2.idea;
                    a.id = "ideaName";
                    div.appendChild(a);
                    li.appendChild(div);
                
                if (value2.store != ""){
                    let p1 = document.createElement("p");
                        p1.textContent = value2.store;
                        p1.id = "ideaLocation";
                        li.appendChild(p1);
                }
                if (value2.url != ""){
                    let p2 = document.createElement("p");
                    let a2 = document.createElement("a");
                        a2.href = "http://"+value2.url;
                        a2.setAttribute("target", "_blank");
                        a2.textContent = value2.url;//*
                        p2.id = "ideaUrl";
                        p2.appendChild(a2);
                        li.appendChild(p2);
                }
                if (value2.cost != ""){
                    let p3 = document.createElement("p");
                        p3.textContent = "$" + value2.cost;
                        p3.id = "ideaCost";
                        li.appendChild(p3);
                }
             
        
          })
        }
        })
        },
    
    deleteIdea: function() {
    //let index = -1;
        people.forEach(function(value1){
        value1.ideas.forEach(function(value2, index){
           if (newIdea == value2.idea) {
            value1.ideas.splice(index, 1);
            localStorage.setItem("giftr-quin0234", JSON.stringify(people));
        app.displayGift(); 
        }   
        })
        })         
        },
    
    clearLocal: function(){
        localStorage.clear();
        location.reload("index.html");
        console.log("Cleared")
    },
    
    toggleModalPersonOn: function() {
        let modalFormPerson = document.querySelector("#personModal");
        modalFormPerson.classList.toggle("active");
    },
    
    toggleModalGiftOn: function() {
        let modalFormGift = document.querySelector("#giftModal");
        modalFormGift.classList.toggle("active");
    },
     
    
    compare: function(a,b){
    if(a.dob.substring(5) < b.dob.substring(5)) return -1;
    if(a.dob.substring(5) > b.dob.substring(5)) return 1;
    return 0;
    },

    cancelContactSetup: function(){
    document.getElementById("name").value = "";
    document.getElementById("dob").value = "";
    app.toggleModalPersonOn();
    },

    cancelIdeaSetup: function(){
    document.getElementById("giftIdea").textContent = "";
    document.getElementById("store").textContent = "";
    document.getElementById("url").textContent = "";
    document.getElementById("cost").textContent = "";
    app.toggleModalGiftOn();
    },
    
    };

app.init();
    
    