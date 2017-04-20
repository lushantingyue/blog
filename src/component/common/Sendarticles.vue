<template>
    <el-form ref="form" :model="form" label-width="80px" style="margin-top:30px">
        <el-row>
            <el-col :span="14">
                <el-form-item label="文章标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10">
                <el-form-item label="标签">
                    <el-select v-model="form.label" placeholder="请选择">
                    <el-option label="一" value="1"></el-option>
                    <el-option label="二" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
              <textarea id="editor"></textarea>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="text-align: center;">
              <el-button type="primary" @click="onSubmit()">发布</el-button>
          </el-col>
        </el-row>
    </el-form>  
</template>

<script>
  import { addArticle } from '../api/api';
  import SimpleMDE from 'simplemde'
  import '../../assets/css/simplemde.css'
  import marked from 'marked';

  export default {
    data() {
      return {
        form: {
          title: '',
          delivery: false,
          label:'',
          content:''
        }
      }
    },
    mounted:function(){
      var _this = this;  
      var smde = new SimpleMDE({
            element: document.getElementById('editor'),
            autofocus: true,
            autosave: true,
            previewRender: function(plainText) {
                console.log(plainText);
                return marked(plainText,{
                    renderer: new marked.Renderer(),
                    gfm: true,
                    pedantic: false,
                    sanitize: false,
                    tables: true,
                    breaks: true,
                    smartLists: true,
                    smartypants: true,
                    highlight: function (code) {
                        console.log(code);
                        //return highlight.highlightAuto(code).value;
                    }
                });
            },
        });
        smde.codemirror.on("change", function(){
            var value = smde.value();
            //console.log(value);
            _this.form.content = value;
        });

    },
    methods: {
      onSubmit:function() {
        var _this = this;  
        var para = this.form;
        addArticle(para).then((res) => {
					if(res.coke == "1"){
                        this.$message({
								message: res.msg,
								type: 'success'
							});
                            setTimeout(function(){
                                _this.$router.push('/home/manage/articles');
                            },2000)
                                
                    }else{
                       this.$message.error(res.msg);
                    }
				});
      }
    }
  }
  
</script>