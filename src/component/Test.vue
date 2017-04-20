<template>
  <div v-loading="loading">
    <h1>{{ msg }}</h1>
    <el-button @click.native="startHacking">btn</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="text">文字按钮</el-button>
    <i class="el-icon-edit"></i>
    <i class="el-icon-share"></i>
    <i class="el-icon-delete"></i>
    <el-button type="primary" icon="search">搜索</el-button>


     <el-radio class="radio" v-model="radio" label="1">备选项</el-radio>
     <el-radio class="radio" v-model="radio" label="2">备选项</el-radio>
     <el-switch v-model="value1" on-text="" off-text=""></el-switch>
     <el-switch v-model="value2" on-color="#13ce66" off-color="#ff4949"></el-switch>

     <div class="block">
        <span class="demonstration">默认不区分颜色</span>
        <el-rate v-model="value3"></el-rate>
     </div>
    <div class="block">
        <span class="demonstration">区分颜色</span>
        <el-rate v-model="value4" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
    </div>

    <el-alert title="成功提示的文案" type="success" show-icon></el-alert>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>

    <el-button :plain="true" @click="open">打开消息提示</el-button>

    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>

    <el-row class="tac">
      <el-col :span="8">
        <h5>带 icon</h5>
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
          <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="8">
        <h5>不带 icon</h5>
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
          <el-submenu index="1">
            <template slot="title">导航一</template>
            <el-menu-item-group title="分组一">
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">导航二</el-menu-item>
          <el-menu-item index="3">导航三</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="8">
        <h5>分组</h5>
        <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo">
          <el-menu-item-group title="分组一">
            <el-menu-item index="1"><i class="el-icon-message"></i>导航一</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-message"></i>导航二</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组二">
            <el-menu-item index="3"><i class="el-icon-message"></i>导航三</el-menu-item>
            <el-menu-item index="4"><i class="el-icon-message"></i>导航四</el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-col>
    </el-row>



  </div>
</template>


<script>
export default {
  data () {
    return {
      msg: 'Home',
      radio: '1',
      value1: true,
      value2: true,
      value3: null,
      value4: null,
      tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        loading:true,
    }
  },
  mounted:function(){
    var _this = this;
    setTimeout(function(){
      _this.loading=false;
    },500)
  },
  methods: {
    startHacking () {
      this.$notify({
        title: 'home',
        message: 'content',
        duration: 5000
      })
    },
    open() {
        this.$message({message:'这是一条消息提示',duration:'1000'});
         this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        });
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
    }

  }
    
}

</script>

