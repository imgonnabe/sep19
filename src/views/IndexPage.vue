<template>
  <div>
    <h1>detail</h1>
    {{this.list}}
    {{this.members}}
    {{this.cmtTop5}}
  </div>
</template>

<script>
export default {
  name:'indexPage',
  data(){
    return{
      list:[],
      members:[],
      cmtTop5:[]
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
    }
  }
}
</script>

<style>

</style>