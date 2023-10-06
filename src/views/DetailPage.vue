<template>
  <div class="board-detail">
    글번호 : {{detail.bno}}<br>
    글제목 : {{detail.btitle}}
    <button v-if="this.userInfo.m_id == this.detail.m_id" v-on:click="update">수정</button>
    <button v-if="this.userInfo.m_id == this.detail.m_id" v-on:click="deletePost">삭제</button>
    <br>
    글쓴이 : {{detail.m_name}}<br>
    날짜 : {{detail.bdate}}<br>
    내용 : {{detail.bcontent}}<br>
    <button v-on:click="board">게시판으로</button>
    <hr>
  </div>
    <div class="comment" v-for="n in comments" v-bind:key="n.c_no">
        <div class="m_id">{{n.m_id}}({{n.m_name}})</div>
        <div class="c_comment">{{n.c_comment}}</div>
        <div class="c_date">{{n.c_date}}</div>
        <input class="c_cno" type="hidden" value="{{n.c_no}}">
        <button v-if="this.userInfo.m_id == n.m_id" v-on:click="cupdate">수정</button>
        <button v-if="this.userInfo.m_id == n.m_id" v-on:click="cdeletePost(n.c_no)">삭제</button>
        <hr>
    </div>
    <div v-if="this.userInfo.m_name != null">
      <textarea v-model="c_comment"></textarea>
      <button v-on:click="cwrite">댓글쓰기</button>
    </div>
    <div v-if="this.userInfo.m_name != null">
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
        m_id: '',
        blike:''
      },
      comments:[],
      c_comment:null,
      c_no:'',
      userInfo:{
          m_name: this.$store.getters.getUserName,
          m_id: this.$store.getters.getUserId
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
      this.$axios.get(this.$server + '/comments?bno=' + this.detail.bno)
      .then((res) => {
        this.comments = res.data.arr2
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
    },
    cwrite(){
    let saveData2 = {};
        saveData2.c_comment = this.c_comment;
        saveData2.m_id = this.userInfo.m_id;
        saveData2.bno = this.detail.bno;
        this.$axios.post(this.$server + '/cwrite', JSON.stringify(saveData2), {
          headers:{"Content-Type":"application/json"}
        })
        .then((res) => {
          if(res.data.result == 1){
            
            this.$router.push({
                path: '/detail',
                query : this.requestBody
            });
          } else {
            alert("문제 발생")
          }
        })
        .catch((err) => {
          alert('에러' + err)
        });
      },
      cdeletePost(c_no){
      if(confirm('삭제하시겠습니까?')){
        // alert(this.detail.bno);
        alert('삭제합니다.')
        this.$axios({
          url: this.$server +'/cdelete',
          method:'post',
          params:{cno:c_no}
        })
        .then((res) => {
          if(res.data.result == 1){
            alert('삭제되었습니다.')
            this.$router.push({
              path:'/detail',
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
    cupdate(){
      if(confirm('수정하시겠습니까?')){
        this.$router.push({
          path: '/cupdate',
          // bno:this.detail.bno
          query:this.requestBody
        })
      }
    }
  }
}
</script>

<style>
.comment{
  background-color: bisque;
}
</style>