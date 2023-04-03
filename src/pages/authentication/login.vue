<template>
  <form
    class="form-horizontal auth-form"
    @submit.prevent="handleSubmit"
    method="post"
  >
    <div class="form-group">
      <input
        v-model="username"
        name="login[username]"
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        placeholder="name@domain.com"
      />
    </div>
    <div class="form-group">
      <input
        :type="type"
        v-model="password"
        name="login[password]"
        class="form-control"
        placeholder="**********************"
      />
    </div>
    <div class="form-terms">
      <div class="custom-control custom-checkbox mr-sm-2">
        <input
          type="checkbox"
          class="custom-control-input"
          id="customControlAutosizing"
        />
        <label class="custom-control-label" for="customControlAutosizing"
          >Remember me</label
        >
        <a href="#" class="btn btn-default forgot-pass">lost your password</a>
      </div>
    </div>
    <div class="form-button">
      <button class="btn btn-primary" type="submit" @click="login">
        Login
      </button>
    </div>
    <div class="form-footer">
      <span>Or Login up with social platforms</span>
      <ul class="social">
        <li>
          <feather
            type="facebook"
            class="icon-facebook"
            fill="#F98085"
            stroke="#F98085"
            size="16px"
          ></feather>
        </li>
        <li>
          <feather
            type="twitter"
            stroke="#F98085"
            size="16px"
            class="icon-twitter"
          ></feather>
        </li>
        <li>
          <feather
            type="instagram"
            stroke="#F98085"
            size="16px"
            class="icon-instagram"
          ></feather>
        </li>
        <li>
          <feather
            type="github"
            stroke="#F98085"
            size="16px"
            class="icon-instagram"
          ></feather>
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
import Userauth from "../../auth/index.js";
import firebase from "firebase";
export default {
  components: {},
  data() {
    return {
      type: "password",
      username: "",
      password: "",
      submitted: false
    };
  },
  created() {
    // reset login status for JWT
    this.$store.dispatch("authentication/logout");
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
    },
    login() {
      this.submitted = true;
      if (this.email == "" && this.password == "") {
        this.$toasted.show("Email or Password is required", {
               theme: "bubble",
               position: "top-right",
               type: "success",
               duration: 2000
             });
      } else {
        let data = {
          username: this.username,
          password: this.password
        };

        firebase
          .auth()
          .signInWithEmailAndPassword(data.username, data.password)
          .then(
            result => {
              Userauth.localLogin(result);
              if (result.user.refreshToken) {
                localStorage.setItem(
                  "user",
                  JSON.stringify(result.user.refreshToken)
                );
              }
             this.$toasted.show("succesfully loged in", {
               theme: "bubble",
               position: "top-right",
               type: "success",
               duration: 2000
             });
              this.$router.push("/");
            },
            err => {
              this.$toasted.show("Oops..." + err.message, {
                theme: "bubble",
                position: "top-right",
                type: "error",
                duration: 2000
              });
            }
          );
      }
    }
  }
};
</script>