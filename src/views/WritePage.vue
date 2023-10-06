<template>
  <div class="write">
    <h1>글쓰기</h1>
    <input v-model="title">
    <textarea v-model="content"></textarea>
    <button @click="write">글쓰기</button>
  </div>
</template>

<script>
export default {
    data(){
      return{
        title:null,
        content:null,
        userInfo:{
          m_name: this.$store.getters.getUserName,
          m_id: this.$store.getters.getUserId
        }
      }
    },
    mounted(){
      // 로그인 검사
      this.loginCheck();
    },
    methods:{
      loginCheck(){
        if(this.$store.getters.getUserId == null){
          alert('로그인하세요.')
          this.$router.push('login')
        }
      },
      write(){
        let saveData = {};
        saveData.title = this.title;
        saveData.content = this.content;
        saveData.m_id = this.userInfo.m_id
        // alert(saveData.title)
        this.$axios.post(this.$server + '/write', JSON.stringify(saveData), {
          headers:{"Content-Type":"application/json"}
        })
        .then((res) => {
          if(res.data.result == 1){
            alert("db에 글을 저장했습니다.")
            this.$router.push("/boardList")
          } else {
            alert("문제 발생")
          }
        })
        .catch((err) => {
          alert('에러' + err)
        });
      }
    }
}
</script>

<style>
.write{
  margin: 0 auto;
  padding: 5px;
  width: 800px;
  height: 500px;
  background-color: bisque;
}
.write input{
  width: 95%;
  margin: 5px;
}
.write textarea{
  width: 95%;
  margin: 5px;
}
</style>