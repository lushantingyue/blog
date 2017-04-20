<template>
	<section style="margin-top:30px;">
		
		<!--列表-->
		<el-table :data="article" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="100" label="序号">
			</el-table-column>
			<el-table-column prop="title" label="标题"  min-width="180"  >
			</el-table-column>
			<el-table-column prop="state" label="状态" width="100"  :formatter="statechange" >
			</el-table-column>
			<el-table-column prop="addtime" label="添加时间" min-width="80" :formatter="formatDate" sortable >
			</el-table-column>
			<el-table-column prop="username" label="作者" width="120" >
			</el-table-column>
			<el-table-column prop="label" label="标签"  width="120" >
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-top:30px;">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="15" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

	</section>
</template>

<script>
	import { getArticleListPage, removeArticle,batchRemoveArticle, editArticle, addArticle } from '../api/api';
	export default {
		data() {
			return {
				state:[], //文章状态
				filters: {
					name: ''
				},
				article: [],//文章列表数据
				total: 0,//页码总数
				page: 1,//当前页码
				listLoading: false,
				sels: [],//列表选中列
			}
		},
		methods: {
			//状态
			statechange:function(row,column){
				return row.state == '1' ? '启用' : row.state == '0' ? '禁用' : '未知';
			},
			toDub:function(str){
				return str > 9 ? str : '0'+str;
			},
			//格式化时间
			formatDate:function(row,column){
				var timer = row.addtime;
				var oDate = new Date();
				oDate.setTime(timer);
				var y = oDate.getFullYear();//年
				var m = oDate.getMonth()+1;  // 0-11月
				var day = oDate.getDate();//日
				var h = oDate.getHours();      // 小时
				var mm = oDate.getMinutes();   // 分
				var s = oDate.getSeconds();  // 秒
				return y+'年'+this.toDub(m)+'月'+this.toDub(day)+'月'+' '+this.toDub(h)+':'+this.toDub(mm)+':'+this.toDub(s) ;
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getArticleList();
			},
			//获取文章列表
			getArticleList() {
				this.listLoading = true;
				let para = {
					rows:15,
					index: this.page, /*当前页码*/
				};	
				getArticleListPage(para).then((res) => {
					this.total = res.data.size; /*文章总数*/
					this.article = res.data.result; /*文章数据列表*/
					this.listLoading = false; 
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { id: row._id };
					removeArticle(para).then((res) => {
						this.listLoading = false;
						if(res.coke == 1){
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.getArticleList();
						}else{
							this.$message.error(res.msg);
						}
						
					});
				}).catch(() => {

				});
			},
		
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item._id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: ids,type:'all' };
					batchRemoveArticle(para).then((res) => {
						this.listLoading = false;
						if(res.coke == 1){
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.getArticleList();
						}else{
							this.$message.error(res.msg);
						}
						
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getArticleList();
		}
	}

</script>

<style scoped>

</style>