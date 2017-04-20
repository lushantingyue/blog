<template>
     <el-col>
        <el-collapse accordion v-model="activeNames">
            <el-collapse-item v-for="(menu,index) in menus" :title="menu.name" :name="index" v-if="menu.visible">
                <ul class="el-menu-itms">
                    <li v-for="menuitem in menu.child" class="el-menu-item" v-if="menuitem.visible">
                      <router-link  :to="{ path: '/'+menuitem.path }"><i :class="menuitem.icon"></i>{{menuitem.name}} </router-link>
                    </li>
                </ul>
            </el-collapse-item>
        </el-collapse>
    </el-col>
</template>
<script>
  import { requestMenus } from './api/api';
  export default {
    name: 'menus',
    data(){
      return{
        menus:[],
        activeNames: ['1'],
        name:''
      }
    },
    mounted:function(){
      var _this = this;
      requestMenus().then(res=>{
        var { coke } = res.data;
        if(coke != 1){
          this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
        }else{
          _this.menus = res.data.result;
        }
      })
    },
    methods: {
    }
  }
</script>