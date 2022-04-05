<template>
  <div class="login">
    <h1>Login</h1><br>
    <input type="text" name="username" v-model="input.username" placeholder="Username" /><br><br>
    <input type="password" name="password" v-model="input.password" placeholder="Password" /><br><br>
    <button type="button" v-on:click="login()">Login</button>
  </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                },
                mockAccount: {
                    username: "username",
                    password: "password"
                }
            }
        },
        methods: {
            login() {
                if(this.input.username != "" && this.input.password != "") {
                  console.log("username: " + this.mockAccount.username);
                  console.log("password: " + this.mockAccount.password);
                    if(this.input.username == this.mockAccount.username && this.input.password == this.mockAccount.password) {
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "secure" });
                    } else {
                        console.log("The username and / or password is incorrect");
                    }
                } else {
                    console.log("A username and password must be present");
                }
            }
        }
    }
</script>


<style>
@media (min-width: 1024px) {
  .login {
    /* min-height: 100vh; */
    /* display: flex; */
    align-items: center;
    align-content: center;
  }
}

.login {
  width: 500px;
  height: 250px;
  border: 1px solid #CCCCCC;
  background-color: #FFFFFF;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
  text-align: center;
  align-content: center;
}

</style>
