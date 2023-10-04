<template>
  <div>
    <h1>login</h1>
    <input v-model="userId" type="text">
    <input v-model="userPw" type="password">
    <button class="btn" @click="loginSubmit">LOGIN</button>
    {{error}}
  </div>
</template>

<script>
export default {
    data(){
      return{
        userId: null,
        userPw: null,
        error:'',
        userInfo:{
          m_name: this.$store.getters.getUserName,
          m_id: this.$store.getters.getUserId
        }
      }
    },
    methods: {
      loginSubmit(){
        // alert(this.userId + ' : ' + this.userPw)
        let login = {};
        login.userId = this.userId,
        login.userPw = this.userPw;
        try {
          this.$axios
          .post(this.$server+"/login", JSON.stringify(login), {
            headers: { "Content-Type": `application/json` },
          })
          .then((res) => {
            if (res.status === 200) {             
              if (res.data.result.count == 1) {
                this.userInfo.m_name = res.data.result.m_name,
                this.userInfo.m_id = login.userId,
                this.$store.commit("setUser", this.userInfo);
                this.$router.push("/boardList");
              }else{
                this.error = '올바른 아이디와 암호를 입력하세요.';
              }
            }
          });
        } catch (error) {
          console.error(error);
          }
        }
    }
}
</script>

<style>

</style>