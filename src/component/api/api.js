import axios from 'axios';

let base = '';

/*登录*/
export const requestLogin = params => { return axios.post(`${base}/api/login`, params).then(res => res.data); };

/*获取左侧菜单 */
export const requestMenus = params => { return axios.get(`${base}/api/getMenus`, { params: params }); };

/*获取文章列表*/
export const getArticleListPage = params => { return axios.get(`${base}/api/ArticlePage`, { params: params }); };

/*删除文章*/
export const removeArticle = params => { return axios.post(`${base}/api/removeArticle`, params).then(res => res.data); };

/*批量删除 */
export const batchRemoveArticle = params => { return axios.post(`${base}/api/removeArticle`, params).then(res => res.data); };

/*修改文章*/
export const editArticle = params => { return axios.get(`${base}/api/getMenus`, params).then(res => res.data); };

/*添加文章*/
export const addArticle = params => { return axios.post(`${base}/api/saveArticle`, params).then(res => res.data); };