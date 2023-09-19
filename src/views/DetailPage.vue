<template>
  <div class="board-detail">
    글번호 : {{detail.bno}}<br>
    글제목 : {{detail.btitle}}<br>
    글쓴이 : {{detail.m_name}}<br>
    날짜 : {{detail.bdate}}<br>
    내용 : {{detail.bcontent}}<br>
    <button v-on:click="board">게시판으로</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
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
      axios.get('http://localhost:3000/detail?bno=' + this.detail.bno)
      .then((res) => {
        this.detail = res.data
      })
      .catch((err) => {
        alert('오류' + err)
      });
    }
  }
}
</script>

<style>

</style>