
<template>
    <div class="container">    
        <main class="col-12">   
            
            <section class="col-12">
                <h1 class="btn btn-dark btn-lg btn-block" >Administrateur</h1>
                 <Home></Home>
            </section>
            <section id="filPrincipal" class="row">
                <div class="col-12 col-md-4">
                
                    <article class="card bg-light my-3 class=center-block" style="float:none;">
                        <div class="card-header">
                            <div class="row justify-content-around">
                                <div class="m-1"> Bienvenue {{ nameCurrentUser }} ! </div>
                                <button class="btn btn-dark btn-lg btn-block"  @click="localClear">Se déconnecter </button>
                            </div>
                        </div>
                        <div class="card-body text-center">
                            <div class="dropdown text-center">
                                <p>Membre depuis le {{ creation }}</p>
                            </div>
                            
                        
                                     
                                
                            
                        </div>
                        
                    </article> 
                </div>   
                
                <article class="col col-md-8 mt-5">
                    
                    <div class="row justify-content-around">
                       
                        <button @click="toAllUsers()" class="btn btn-dark btn-lg btn-block" >USERS</button>
                    </div>
                </article>
            </section>
        </main>
    </div>
</template>


<script>
import Home from "../components/Home";
import axios from "axios";
import router from "../router";
import "../main.css";

export default {
    name: "Admin",
    components: {
      Home
    },
    data() {
        return {
            isAdmin: false,
            nameCurrentUser: "",
            creation: ""
        }
    },
    created: function() {        
        let id          = localStorage.getItem('userId');
        let self        = this;  
        axios.get("http://localhost:3000/api/users/" + id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            self.creation           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.isAdmin            = res.data.isAdmin;
            self.nameCurrentUser    = res.data.userName.charAt(0).toUpperCase() + res.data.userName.slice(1);       
        })
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
        },
        seeOnePost(m) {
            console.log(m);
            localStorage.setItem('MessageId', m);
            router.replace("http://localhost:8080/api/comment")
        },
     
        toAllUsers() {
            router.replace("http://localhost:8080/api/AllUsers")
        }
    }
}
</script>