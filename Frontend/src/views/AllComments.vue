<template>
    <main class="container">    
        <div class="col-12">
           
            <div class="col-12">
                <router-link v-if="isAdmin" to='/Admin'><h1 class="my-2 btn btn-block btn-danger font-weight-bold">Administration</h1></router-link>
                <Home></Home>
            </div>
            <section id="filPrincipal" class="row">
                <sub class="col-12 col-md-4">
                   
                    <article class="card bg-light my-3 class=center-block" style="float:none;">
                        <div class="card-header">
                            <div class="row justify-content-around">
                                <p > Bonjour {{ nameUser }} ! </p>
                                <button class="btn btn-dark btn-lg btn-block" @click="localClear"> Se déconnecter </button>
                            </div>
                        </div>
                        <div class="card-body text-center">
                            <div class="dropdown text-center">
                                <p>Membre depuis le {{ creation }}</p>
                            </div>
                            
                        </div>
                       
                    </article> 
                </sub>   
                 
                <sub class="col col-md-8">
                   
                    <div v-for="i in messages" :key="i">   
                        <div class="badge btn-primary p-3 badgeList">
                            <span class="spanBadge"> Le {{ i.createdAt.slice(0,10).split("-").reverse().join(".")}} </span>  
                            <span class="spanBadge"> {{ i.userName.charAt(0).toUpperCase() + i.userName.slice(1) }} </span> 
                            <span class="spanBadge"> {{ i.message.slice(0,10) }}...</span> 
                            <span class="spanBadge"> publication #{{ i.id }}</span> 
                            <span class="spanBadge"> <button class="rounded" @click="seeOnePost( i.id )"> Voir </button> </span> 
                        </div>
                    </div>
                </sub>
            </section>
        </div>
    </main>
</template>

<script>
import Home from "../components/Home";
import axios from "axios";
import router from "../router";
import "../main.css";

export default {
    name: "AllComments",
    components: {
      Home
    },
    data() {
        return {
            isAdmin: false,
            messages: [],
            nameUser: "",
            creation: ""
        }
    },
    created: function() {        
        let id          = localStorage.getItem('userId');
        let self        = this;  
        axios.get("http://localhost:3000/api/messages",  { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then((res) => {
            console.log(res)
            if (res) {
                self.messages = res.data.list;
                console.log(res.data.list)
            } else {
                console.log("aucun message")
            }
        })
        .catch((error)=>{
            console.log(error)
        })      
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
        }
    }
}
</script>