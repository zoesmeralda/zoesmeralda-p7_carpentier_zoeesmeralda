<template>
    <main class="container">
         <router-link to="/Feed"> <button class="btn btn-dark btn-lg btn-block">Retour au Fil d'actualité </button></router-link>
        <section class="row card bg-light m-5 p-3">
            <form enctype="multipart/form-data">
             
                <div class="row">
                    <div class="col-12 justify-content-center form-group">
                        
                        <textarea v-on:keydown="isInvalid = false"  class="form-control" v-model="newComment" id="newComment" name="comment" rows="8" placeholder=" (1500 caractères max) "></textarea>
                    </div>
                </div>
                <div class="footer col-10 mx-auto align-content-center">
                    <div><button type="submit" @click.prevent="send()" class="btn btn-dark btn-lg btn-block">Valider</button></div>
                    
                </div>
                <div v-show="isInvalid" class="invalidBox m-2" key="invalid">
                    <p>"(1500 caractères max) "</p>
                </div>  
            </form>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import router from "../router";
import "../main.css";

export default {
    name: "CreateComment",
     data() {
        return {
            isAdmin: false,
            currentUserId: "", 
            newComment: "",
            comments: [],
            isInvalid: false
        }
    },
    methods: {
        callName() {
            let name = localStorage.getItem('userName');
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
        callNumber() {
            return localStorage.getItem('MessageId')
        },
        send() {

            if (!this.newComment || !localStorage.getItem("userId") || !localStorage.getItem("MessageId" || this.newComment.length > 1500)) {
                this.isInvalid = true;
            } else {

                let UserId      = localStorage.getItem("userId");
                let comment     = this.newComment.toString();
                let MessageId   = localStorage.getItem("MessageId");

                axios.post("http://localhost:3000/api/comments/", { UserId, comment, MessageId } , { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
                .then(()=> {
                    this.UserId = ""
                    this.newMessage = ""
            
                    alert('Commentaire Posté!')
                    router.push({path : 'Comment'})
                    
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
        }
    }
}
</script>