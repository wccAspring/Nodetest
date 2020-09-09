import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import BackIndex from '../components/BackIndex'
import CourseList from '../components/CourseList' // 课程列表
import IndexContent from '../components/IndexContent' // 首页统计
import AdminList from '../components/AdminList' // 后台用户
import StudentList from '../components/StudentList' // 学员用户
import CourseEdit from '../components/CourseEdit' // 编辑课程


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', //系统首页
      component: BackIndex
    },
    {
      path: '/BackIndex', // 首页框架
      component: BackIndex,
      //子页面
      children:[
              {path: 'courseList', component: CourseList },
                {path: 'indexContent', component: IndexContent},
                {path: 'adminList', component: AdminList },
                {path: 'studentList', component: StudentList},
                {path: 'courseEdit', component: CourseEdit},
                { path: '*', redirect: 'indexContent'}
              ]
    },
    {
      path: '/Login',
      component: Login
    }
  ]
})
