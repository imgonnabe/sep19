<template>
  <div>
    <h1>board : {{this.userInfo.m_name}}</h1>
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
    <div class="paging">
        {{pageNo}}
      <button v-on:click="board(startpage)">&lt;&lt;</button>
      <button v-on:click="prevPage">&lt;</button>
      <button v-for="pageNumber in lastRecordIndex - firstRecordIndex + 1" :key="pageNumber" v-on:click="board(firstRecordIndex + pageNumber - 1)">{{firstRecordIndex + pageNumber - 1}}</button>
      <button v-on:click="nextPage">&gt;</button>
      <button v-on:click="board(endpage)">&gt;&gt;</button>
    </div>
    <button v-if="this.$store.getters.getUserId != null" @click="write">글쓰기</button>
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
            pageNo: this.$route.query.pageNo,
            totalcount: null,
            totalpage: null,
            totalpageCount: null,
            startpage: null,
            endpage: null,
            firstRecordIndex: null,
            lastRecordIndex: null,
            userInfo:{
                m_name: this.$store.getters.getUserName,
                m_id: this.$store.getters.getUserId
            }
        };
    },
    mounted(){       
        this.board(this.requestBody.pageNo);
    },
    methods:{
        paging(totalcount){
            this.totalcount = totalcount
            this.totalpage = Math.ceil(this.totalcount / 20)
            this.startpage =  1
            this.endpage = this.totalpage
            this.firstRecordIndex = this.pageNo % 10 != 0 ? parseInt(this.pageNo / 10) * 10 + 1 : this.pageNo - 9
            this.lastRecordIndex = this.firstRecordIndex + 9
            if(this.lastRecordIndex >= this.endpage){
                this.lastRecordIndex = this.endpage
            }
        },
        prevPage(){
            if (this.firstRecordIndex > 1) {
                this.board(this.firstRecordIndex - 1);
            }
        },
        nextPage(){
            if (this.lastRecordIndex < this.totalpage) {
                this.board(this.lastRecordIndex + 1);
            }
        },
        board(pageNo){
            this.requestBody.pageNo = pageNo
            this.$axios
            .get(this.$server + '/board', {params:this.requestBody})
            .then((res) => {//function(res){}
                // alert(res.data.arr[0].btitle);
                this.list = res.data.arr;
                this.pageNo = res.data.pageNo
                this.paging(res.data.totalcount)          
            })
            .catch((err) => {
                alert('문제가 발생했습니다.boardList ' + err);
            });
        },
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