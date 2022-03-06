<template>
    <main class="container">
         
        <section >
            <form @submit.prevent="sendForm(event)">
               
            
            
            <div class="form-group">
                 <label for="inputName">Username:</label>
                <input v-on:keydown="isInvalid = false" v-model="inputUserName" type="text" id="inputUserName" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                 <label for="inputEmail">Email:</label>
                <input v-on:keydown="isInvalid = false" v-model="inputEmail" id="inputEmail" type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label for="inputPassword" >Password</label>
                <input v-on:keydown="isInvalid = false" v-model="inputPassword" id="inputPassword" type="password" class="form-control form-control-lg" />
            </div>

<button type="submit" class="btn btn-dark btn-lg btn-block">Créer un compte</button>
           <router-link to="/Login"> Login </router-link>
                    <small id="passwordHelp" class="form-text text-muted">de 8 a 15 caractères dont au moins 1 lettre et 1 chiffre</small>
                                         
            </form>
        </section>  
       
    </main>
</template>

<script>
import axios from "axios";
import router from "../router";
import "../main.css";

export default {
    name: "Signup",
    data() {
        return {
            inputUserName: "",
            inputEmail: "",
            inputPassword: "",
            invalid: false
        }
    },
    methods: {
        sendForm() {
            if ( !this.inputUserName || !this.inputEmail || !this.inputPassword ) {
                return this.invalid = true;
            }
            const nameRegex = /(.*[a-z]){3,30}/;
            const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            const passwordRegex  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/  

            if ( nameRegex.test(this.inputUserName) && mailRegex.test(this.inputEmail) && passwordRegex.test(this.inputPassword)) {

                axios.post("http://localhost:3000/api/auth/signup", { 
                    userName    : this.inputUserName, 
                    email       : this.inputEmail,
                    password    : this.inputPassword
                })
                .then(() => {
                    alert('inscription réussie, redirection vers le module de connexion');
                    router.push({ path : '/'});
                })
                .catch((error)=>{
                    alert(error.status)
                    console.log(error)});
            } else {
                console.log('validation form, method sendForm, renvoie une erreur')
                this.invalid = true;
            }
        }
    }
}    
</script>