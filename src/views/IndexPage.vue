<template>
  <div>
    <h1>index</h1>
    <table>
        <thead>
            <tr>
                <th>제목</th>
                <th>글쓴이</th>
                <th>날짜</th>
                <th>조회수</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="n in cmtTop5" v-bind:key="n.bno">
                <td class="title" v-on:click="viewDetail(`${n.bno}`)">{{n.btitle}}</td>
                <td>{{n.m_name}}</td>
                <td>{{n.bdate}}</td>
                <td>{{n.blike}}</td>
            </tr>
        </tbody>
    </table>
    <table>
        <thead>
            <tr>
                <th>제목</th>
                <th>글쓴이</th>
                <th>날짜</th>
                <th>조회수</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="n in list" v-bind:key="n.bno">
                <td class="title" v-on:click="viewDetail(`${n.bno}`)">{{n.btitle}}</td>
                <td>{{n.m_name}}</td>
                <td>{{n.bdate}}</td>
                <td>{{n.blike}}</td>
            </tr>
        </tbody>
    </table>
    <table>
        <thead>
            <tr>
                <th>아이디</th>
                <th>글쓴이</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="n in members" v-bind:key="n.bno">
                <td>{{n.m_id}}</td>
                <td>{{n.m_name}}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name:'indexPage',
  data(){
    return{
      list:[],
      members:[],
      cmtTop5:[],
      requestBody: this.$route.query,// 현재 경로 URL의 쿼리 매개변수
    }
  },
  mounted(){
    this.index()
  },
  methods:{
    index(){
      this.$axios
      .get(this.$server + '/index')
      .then((res) => {
        this.list = res.data.list
        this.members = res.data.members
        this.cmtTop5 = res.data.cmtTop5
      })
      .catch((err) => {
        alert(err)
      })
    },
    viewDetail(bno){
        // alert(bno + '번을 눌렀습니다.')
        this.requestBody.bno = bno
        this.$router.push({
            path: '/detail',
            query : this.requestBody
        });
    },
  }
}
</script>

<style>
table {
 margin: 10px;
 width: 800px;
 height: 300px;
 border-collapse: collapse;
 margin: 0 auto;}
th {background-color: rgb(169, 109, 109);}
td {border-bottom: 1px gray solid;}
tr:hover {background-color: gray;color: white;}
.title {text-align: left;}
#td1 {width: 10%;}
#td2 {width: 30%;}
td a {color: black;}
</style>