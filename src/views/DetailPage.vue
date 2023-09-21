<template>
  <div class="board-detail">
    글번호 : {{detail.bno}}<br>
    글제목 : {{detail.btitle}}
    <button v-on:click="update">수정</button>
    <button v-on:click="deletePost">삭제</button>
    <br>
    글쓴이 : {{detail.m_name}}<br>
    날짜 : {{detail.bdate}}<br>
    내용 : {{detail.bcontent}}<br>
    <button v-on:click="board">게시판으로</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      requestBody:this.$route.query,
      detail:{
        bno:this.$route.query.bno,
        btitle:'',
        bcontent:'',
        bdate:'',
        m_name:'',
        blike:'',
      }
    }
  },
  mounted(){
    this.boardDetail();
  },
  methods:{
    board(){
      this.$router.push('/boardList');
    },
    boardDetail(){
      // alert('페이지가 구동되면 바로 호출됩니다.')
      this.$axios.get(this.$server + '/detail?bno=' + this.$route.query.bno)
      .then((res) => {
        this.detail = res.data.detail
      })
      .catch((err) => {
        alert('오류' + err)
      });
    },
    deletePost(){
      if(confirm('삭제하시겠습니까?')){
        // alert(this.detail.bno);
        alert('삭제합니다.')
        this.$axios({
          url: this.$server +'/delete',
          method:'post',
          params:{bno:this.detail.bno}
        })
        .then((res) => {
          if(res.data.result == 1){
            alert('삭제되었습니다.')
            this.$router.push({
              path:'/boardList',
              params: this.requestBody
            })
          } else {
            alert('삭제되지 않았습니다.')
          }
        })
        .catch((err) => {
          alert(err)
        })   
      }
    },
    update(){
      if(confirm('수정하시겠습니까?')){
        this.$router.push({
          path: '/update',
          // bno:this.detail.bno
          query:this.requestBody
        })
      }
    }
  }
}
</script>

<style>

</style>