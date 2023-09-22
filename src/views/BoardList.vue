<template>
  <div>
    <h1>board</h1>
    <table>
        <thead>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>글쓴이</th>
                <th>날짜</th>
                <th>조회수</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="n in list" v-bind:key="n.bno">
                <td>{{n.bno}}</td>
                <td class="title">
                    <a v-on:click="viewDetail(`${n.bno}`)">{{n.btitle}}({{n.commentcount}})</a>
                </td>
                <td>{{n.m_name}}</td>
                <td>{{n.bdate}}</td>
                <td>{{n.blike}}</td>
            </tr>
        </tbody>
    </table>
    <button @click="write">글쓰기</button>
  </div>
</template>

<script>
export default {
    name:'BoardList',
    data(){
        return{
            // this.$.router=라우터 객체
            // this.$.route=라우터 상태를 관리하는 객체(현재 탐색 중인 현재 경로를 나타내는 객체)
            list:[],
            requestBody: this.$route.query,// 현재 경로 URL의 쿼리 매개변수
        };
    },
    mounted(){
        this.$axios.get(this.$server + '/board')
        .then((res) => {//function(res){}
            // alert(res.data.arr[0].btitle);
            this.list = res.data.arr;
        })
        .catch((err) => {
            alert('문제가 발생했습니다.boardList ' + err);
        });
        
    },
    methods:{
        viewDetail(bno){
            // alert(bno + '번을 눌렀습니다.')
            this.requestBody.bno = bno
            this.$router.push({
                path: '/detail',
                query : this.requestBody
            });
        },
        write(){
            this.$router.push("write");
        }
    }
}
</script>

<style scoped>
table {
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