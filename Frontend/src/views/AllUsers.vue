<template>
    <main class="container">    
        <div class="col-12">
           
            <div class="col-12">
               <router-link v-if="isAdmin" to='/Admin'><h1 class="btn btn-dark btn-lg btn-block">Administration du site</h1></router-link>
               <Home></Home>
            </div>
            <section id="filPrincipal" class="row">
                
                <article class="col-12 col-md-4">
                    <div class="card bg-light my-3 class=center-block" style="float:none;">
                        <div class="card-header">
                            <div class="row justify-content-around">
                                <p class="m-1"> Bonjour {{ nameCurrentUser }} ! </p>
                                <button @click="localClear"> Se déconnecter </button>
                            </div>
                        </div>
                        <div class="card-body text-center">
                            <div class="dropdown text-center">
                                <p>Membre depuis le {{ creation }}</p>
                            </div>
                        
                        </div>
                    </div> 
                </article> 
              
                <sub class="col col-md-8">
                    
                    <div v-for="i in users" :key="i">   
                        <div class="badge btn-primary p-3 badgeList">
                            <span class="spanBadge"> {{ i.userName.charAt(0).toUpperCase() + i.userName.slice(1) }} </span> 
                            <span class="spanBadge"> {{ i.email }} </span> 
                            <span class="spanBadge"> {{ i.createdAt.slice(0,10).split("-").reverse().join(".")}} </span>  
                            <span class="spanBadge"> <button class="rounded" @click="deleteOneUser( i.id, isAdmin )"> Supprimer l'utilisateur </button> </span> 
                        </div>
                    </div>
                </sub>
            </section>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import router from "../router";
import "../main.css";
import Home from '../components/Home';

export default {
    name: "AllUsers",
    components: {
      Home
    },
    data() {
        return {
            isAdmin: false,
            nameCurrentUser: "",
            creation: "",
            users: []
        }
    },
    created: function() {        
        let id          = localStorage.getItem('userId');
        let self        = this;  

        axios.get("http://localhost:3000/api/users/" + id , { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            self.creation           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.isAdmin            = res.data.isAdmin;
            self.nameCurrentUser    = res.data.userName.charAt(0).toUpperCase() + res.data.userName.slice(1);       
        })
        .catch((error)=> { console.log(error) 
        });

        axios.get("http://localhost:3000/api/users/all" , { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then((res) => {  
            this.users = res.data.found;
        })
        .catch((error)=>{
            console.log(error)
        })      
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        deleteOneUser(uid, isAdmin) {
        console.log(uid, isAdmin)
        
        let confirmDelete = confirm("voulez-vous vraiment supprimer cet utilisateur ?");
            if (confirmDelete == true) {
                axios.delete("http://localhost:3000/api/users/", {
                    headers: { 
                        "Authorization": "Bearer " + localStorage.getItem("token") 
                    },
                    params: {
                        uid:          uid,
                        isAdmin:      isAdmin,
                    }
                })
                .then((res)=> {
                    console.log(res)
                    alert('Confirmer');
                    router.replace("http://localhost:8080/api/AllUsers")
                })
                .catch((error) => { 
                    location.reload();
                    console.log(error)
                })
            } else {
                return 
            }
        },
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
        },
        seeOnePost(p) {
            console.log(p);
            localStorage.setItem('MessageId', p);
            router.replace("http://localhost:8080/api/comment")
        }
    }
}
</script>