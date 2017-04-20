<template>
   <div id="main">
    <div class="app_header">
      <MyHeader></MyHeader>
    </div>
    <div class="app_content">
      <div class="app_nav">
        <MyMenus></MyMenus>
      </div>
      <div class="app_right">
         <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{pathName}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from './common/Header.vue'
import MyMenus from './Menus.vue'

export default {
  name: 'home',
  data () {
    return {
       pathName: this.$route.name,
    }
  },
  components:{
    MyHeader,
    MyMenus
  },
  watch: {
    '$route': function(){
      this.pathName = this.$route.name;
    }
  }
}

</script>

