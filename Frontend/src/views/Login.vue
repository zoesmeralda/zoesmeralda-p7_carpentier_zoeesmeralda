<template>
   <div class="vue-tempalte">
       
            <form @submit.prevent="Submit">
            

            <div class="form-group">
                 <label for="inputEmail">Email:</label>
                <input v-on:keydown="isInvalid = false" v-model="inputEmail" type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label for="inputPassword" >Password</label>
                <input v-on:keydown="isInvalid = false" v-model="inputPassword"  type="password" class="form-control form-control-lg" />
            </div>
<button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>

           <router-link to="/Profile"> Mon profil </router-link>
            </form>
      
        <div class=' col-7 mx-auto mt-3'>
            <router-link to="/Signup"><button type="submit" class="btn btn-dark btn-lg btn-block">Sign up</button></router-link>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import "../main.css";

export default {
    name: "Accueil",
    data() {
        return {
            inputEmail: "",
            inputPassword: "",
            isInvalid: false
        }
    },
    methods: {
        Submit() {

            if ( !this.inputEmail || !this.inputPassword ) {
                    return this.isInvalid = true;
                }

            axios.post("http://localhost:3000/api/auth/login", { 
                email :     this.inputEmail,
                password:   this.inputPassword
             })
            .then(function (res) {
                localStorage.setItem("token",   res.data.token)
                localStorage.setItem("userId",  res.data.userId)
                localStorage.setItem("userName",res.data.userName)
                localStorage.setItem("role",    res.data.role)
                window.alert('connexion réussie, redirection vers la page principale');
                router.push({ path : 'Feed'});
            })
            .catch((error) => {
                this.isInvalid = true;
                console.log(error);
            })         
        }
    }
}    
</script>