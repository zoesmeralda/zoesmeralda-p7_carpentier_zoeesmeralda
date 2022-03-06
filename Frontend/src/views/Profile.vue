<template>
   <div class="ui-bg-cover ui-bg-overlay-container text-white">
    <div class="ui-bg-overlay bg-dark opacity-50"></div>
    <div class="container">
      <div class="d-flex justify-content-between align-items-center pt-4">
        
        <div>
      
          <a href="javascript:void(0)" class="btn btn-outline-white icon-btn btn-sm ml-1">
            <i class="ion ion-md-mail"></i>
          </a>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="text-center py-5">
       

        <div class="col-md-8 col-lg-6 col-xl-5 p-0 mx-auto">
          <h4 class="font-weight-bold my-4">Bienvenue {{ nameCurrentUser }} !</h4>
<button @click="localClear"> Se déconnecter </button>

          <div class="opacity-75 mb-4">
            Membre depuis le {{ creation }}
          </div>
        </div>
      </div>
    </div>

    <div class="ui-bg-overlay-container">
      <div class="ui-bg-overlay bg-dark opacity-25"></div>
      <ul class="nav nav-tabs tabs-alt justify-content-center border-transparent">
        <li class="nav-item">
       
        </li>
        <li class="nav-item">
        <button @click="deleteMyAccount(id)" type="submit" class="btn btn-dark btn-lg btn-block">Supprimer mon compte</button>
        </li>
        <li class="nav-item">
         <router-link to="/CreatePost"><button class="btn btn-dark btn-lg btn-block"> Poster</button> </router-link>
        </li>
        <li class="nav-item">
           <router-link to="/Feed"> <button class="btn btn-dark btn-lg btn-block">Feed </button></router-link>
        </li>
      </ul>
    </div>

</div>
</template>


<script>

import axios from "axios";
import router from "../router";
import "../main.css";

export default {
    name: "Compte",
    
    data() {
        return {
            isAdmin: false,
            nameCurrentUser: "",
            creation: "",
            id: ""
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
            self.id                 = res.data.id     
        })
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
        },
        deleteMyAccount(n) {
            let id = n;
            let confirmDelete = confirm("voulez-vous vraiment supprimer votre compte ?");
            if (confirmDelete == true) {
                axios.delete("http://localhost:3000/api/users/" + id, {headers: { "Authorization": "Bearer " + localStorage.getItem("token") },})
                .then((res)=> {
                    console.log(res);
                    alert('Confirmer la suppression?');
                    router.replace("http://localhost:8080/api/")
                })
                .catch((error) => { 
                    console.log(error)
                })
            } else {
                return 
            }
        },
        toAllComments() {
            router.replace("http://localhost:8080/api/AllComments")
        },
        toAllUsers() {
            router.replace("http://localhost:8080/api/AllUsers")
        }
    }
}
</script>