<template>
    <main class="container">    
        <div class="col-12">
            <div class="col-12 ">
                <h1 v-if= 'this.messages.length !== 0'><b-button disabled size="lg" variant="primary"> Dernières Publications</b-button></h1>   
             
            </div>
            <section id="filPrincipal" class="row">
                <article class="col-12 col-md-4">
                    <div class="card bg-light my-3 class=center-block" style="float:none;">
                        <div class="card-header">
                            <div class="row justify-content-around">
                                <p class="m-1"> Hey {{ name }} ! </p>
                                <button @click="localClear"> Se déconnecter </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="text-center">
                                <p id="membre">Membre depuis le {{ creation }}</p>
                            </div>
                            <div id="compteButton" class="text-center">
                                <router-link v-if="isAdmin" to='/Admin'><button type="button" class=" btn btn-danger mx-auto rounded p-2 buttonsPanel">ADMIN. <button class=" rounded p-1 m-1 "> ACTIVÉE</button></button></router-link> 
                                <router-link v-else to='/Profile'><button type="button" class=" btn btn-secondary mx-auto rounded p-2 buttonsPanel">PROFIL</button></router-link> 
                            </div>
                        </div>
                        <div id="publicationButton" class=" card-body text-center">
                            <router-link to='/CreatePost' ><button type="button" class="btn btn-dark mx-auto p-2 rounded buttonsPanel">POSTER</button></router-link>
                        </div>
                    </div>                  
                </article>
                <sub class="col-12 col-md-8">
                    <div v-for="message in messages" :key="message.id" class="card bg-light my-3">
                        <div class="card-header bg-light d-flex align-items-center justify-content-between m-0 p-1">
                            <span class=" text-dark text-bold  p-1" >
                                Posté par {{ message.userName.charAt(0).toUpperCase() + message.userName.slice(1) }}
                                le {{ message.createdAt.slice(0,10).split('-').reverse().join('.') + ' à ' + message.createdAt.slice(11,16) }}
                            </span>
                            <div class="badge bg-dark text-wrap text-white p-2" style="width: 6rem;">
                                ref # {{ message.id }}                    
                            </div>                                                                                       
                        </div>
                        <div class="btn" @click="commentPage(message.id)">
                            <img :src="message.messageUrl" v-if="message.messageUrl !== '' " class="border messImage" alt="image" />
                        </div>
                        <div class="p-2"> 
                            <p v-if="isAdmin || message.UserId == id" class="ml-2">   {{ message.message }} </p> 
                        </div>
                        <div class="row card-footer justify-content-around">
                            <button @click="commentPage(message.id)" class="border-0"> Commenter </button>
                            <div v-if="isAdmin || message.UserId == id">
                                <button @click="deleteMessage(message.id, message.UserId, id)" class="border-0"> Supprimer </button>
                            </div>
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

export default {
    name: "Feed",
    data() {
        return {
            isAdmin: false,
            messages: [],
            id: "",                 
            name: "",               
            creation: ""           
        }
    },
    created: function() {        
        let id = localStorage.getItem('userId')
        axios.get("http://localhost:3000/api/messages",  { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then((res) => {
            if (res) {
                const rep = res.data.list;
                this.messages = rep; 
                rep.splice(10,);
                localStorage.setItem("MessageId", rep[0].id);
                console.log(this.messages)
            } else {
                console.log("aucun message")
            }
        })
        .catch((error)=>{
            console.log(error)
        })   
        let self = this;
        axios.get("http://localhost:3000/api/users/" + id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            console.log(res)
            self.id                 = res.data.id;
            self.name               = res.data.userName.charAt(0).toUpperCase() + res.data.userName.slice(1);
            self.creation           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.isAdmin            = res.data.isAdmin;
        })
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        commentPage(p) {
            console.log(p);
            localStorage.setItem('MessageId', p);
            router.push({ path : "/Comment" });
        },
        deleteMessage(a, b, c) {
            console.log(
                typeof a,
                typeof b,
                typeof c
            )
            let confirmDelete = confirm("voulez-vous supprimer ce post?");
            if (confirmDelete == true) {
                axios.delete("http://localhost:3000/api/messages/", {
                    headers: { 
                        "Authorization": "Bearer " + localStorage.getItem("token") 
                    },
                    params: {
                        messageId:  a,
                        messageUid: b,
                        uid:        c
                    }
                    })
                .then((res)=> console.log(res))
                .catch((error) => { 
                    location.reload();
                   console.log("1"+ error)})
            } else {
                return
            }
        },
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
        }
    }
}
</script>