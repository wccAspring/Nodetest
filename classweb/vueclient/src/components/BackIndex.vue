
<template>
  <div class="backlogin">
    <!-- 顶部 -->
    <div class="header">
      <div class="search_box" :class="{ search_box_fouce: search_box_fouce }">
        <i class="fa fa-search" aria-hidden="true"></i>
        <input type="text" placeholder="搜索..." @focus="focusFn" @blur="blurFn" />
      </div>
      <div class="handler">
        <div class="more" @click="toggleSlide">
          <i class="fa fa-bars" aria-hidden="true"></i>
          <ul :class="{ showul: showExit }">
            <li><a href="javascript:;" @click="logout"><i class="fa fa-sign-out" aria-hidden="true"></i>退出</a></li>
            <li><a href="javascript:;">修改密码</a></li>
            <li><a href="javascript:;">意见反馈</a></li>
          </ul>
        </div>
        <!-- <img src="../assets/images/teacherimg01.png" alt="" /> -->
      </div>
    </div>

    <!-- 侧面导航 -->
    <div class="sidenav_box">
      <!-- <img src="../assets/images/logo03.png" alt="" class="logo" /> -->
      <ul class="sidenav">
        <li>
          <router-link to="/backIndex/indexContent">
            <i class="fa fa-home" arial-hidden="true"></i>
            <span>网站首页</span>
          </router-link>
        </li>
        <li>
          <router-link to="/backIndex/adminList">
            <i class="fa fa-user-o" arial-hidden="true"></i>
            <span>后台人员</span>
          </router-link>
        </li>
        <li>
          <router-link to="/backIndex/studentList">
            <i class="fa fa-user-circle-o" arial-hidden="true"></i>
            <span>学员管理</span>
          </router-link>
        </li>
        <li>
          <router-link to="/backIndex/courseList">
            <i class="fa fa-book" arial-hidden="true"></i>
            <span>课程管理</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 内容区 -->
    <div class="content">
      <ul class="breadcrumb">
        <li><a href="#/backIndex">首页</a></li>
        <li>{{ pageTitle }}</li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  var pageTitleObj = {
    indexContent: '网站首页',
    adminList: '后台人员',
    studentList: '学员管理',
    courseList: '课程管理',
    courseEdit: '课程编辑'
  }
  export default {
    name: "backlogin",
    data () {
      return {
        search_box_fouce: false,
        showExit: false,
        pageTitle: pageTitleObj[this.$route.path.substr(this.$route.path.lastIndexOf('/') + 1)] || "网站首页"
      }
    },
    methods: {
      // 搜索框获取焦点，添加class
      focusFn () {
        this.search_box_fouce = true
      },
      // 搜索框失去焦点，去掉class
      blurFn () {
        this.search_box_fouce = false
      },
      // 头像旁边下拉框的显示与隐藏
      toggleSlide () {
        this.showExit = !this.showExit
      },
      // 退出系统
      logout () {

      }
    },
    watch: {
      $route: {
        handler (val, oldVal) {
          var path = val.path;
          this.pageTitle = pageTitleObj[path.substr(path.lastIndexOf("/") + 1)] || "网站首页"
        }
      }
    }
  }
</script>
<style scoped>
  ul, li {
    list-style: none;
  }
/* 顶部栏 */
  .header {
    height: 60px;
    box-shadow: 0 1px 5px rgba(13, 62, 73, .2);
    background: #fff;
    margin-left: 80px;
    min-width: 740px;
  }
  .search_box {
    color: #979fa8;
    padding-top: 20px;
    float: left;
  }
  .search_box i {
    margin: 0 12px 0 70px;
    transition: all 0.5s ease;
  }
  .search_box input {
    border: none;
    outline: none;
  }

  .search_box_fouce i {
    margin-left: 55px;
    color: #2c3d50;
  }
  .handler > * {
    float: right;
    margin-right: 20px;
    cursor: pointer;
  }
  .handler .more {
    font-size: 20px;
    color: #566a80;
    margin: 15px 30px 0 0;
    position: relative;
  }
  .handler .more:hover {
    color: #2c3d50;
  }
  .handler .more ul {
    font-size: 14px;
    position: absolute;
    right: 0;
    top: 55px;
    width: 120px;
    box-shadow: 0 1px 5px rgba(13, 62, 73, .2);
    transition: all 0.3s ease-out;
    height: 0;
    opacity: 0;
    overflow: hidden;
    text-align: center;
  }
  .handler .more .showul {
    height: auto;
    top: 45px;
    opacity: 1;
    border-top: 1px solid #979fa8;
  }
  .handler .more a {
    display: block;
    padding: 8px 10px;
    background: #fff;
    color: #566a80;
    text-decoration: none;
  }
  .handler .more a:hover {
    background: #f8f9fb;
  }
  .handler > img {
    width: 50px;
    border-radius: 50%;
    margin-top: 5px;
    margin-right: 30px;
  }
/* 侧边栏 */
  .sidenav_box {
    width: 80px;
    box-shadow: 0 1px 5px rgba(13, 62, 73, .2);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    z-index: 99;
  }
  .sidenav_box .logo {
    width: 46px;
    margin: 20px 0 0 17px;
  }
  .sidenav {
    margin-top: 30px;
  }
  .sidenav li {
    margin-bottom: 20px;
  }
  .sidenav a {
    display: block;
    width: 56px;
    height: 56px;
    margin: 0 auto;
    position: relative;
    cursor: pointer;
    opacity: 0.6;
    transition: all 0.5s ease;
    text-decoration: none;
  }
  .sidenav a:hover {
    background: #f0f2f5;
    opacity: 1;
  }
  .sidenav a i {
    display: block;
    font-size: 20px;
    line-height: 56px;
    text-align: center;
    color: #566a80;
  }
  .sidenav a span {
    position: absolute;
    left: 55px;
    top: 22px;
    background: #000;
    color: #fff;
    width: 0;
    padding: 5px 0;
    border-radius: 3px;
    font-size: 12px;
    opacity: 0;
  }
  .sidenav a span:after {
    content: "";
    position: absolute;
    top: 8px;
    left: -10px;
    border: 5px solid transparent;
    border-right-color: #000;
  }
  .sidenav a:hover span {
    opacity: 1;
    left: 65px;
    width: 60px;
    padding: 5px 20px;
    transition: none 0.5s ease-out;
    transition-property: opacity, left;
  }
  .sidenav .router-link-active {
    opacity: 1;
    background: #f0f2f5;
  }
  .sidenav .router-link-active:after {
    content: "";
    position: absolute;
    left: -16px;
    top: 8px;
    height: 40px;
    width: 8px;
    border-radius: 3px;
    background: #566a80;
  }
/* 主页内容 */
  .content {
    margin: 20px 30px 0px 100px;
    min-height: 300px;
    min-width: 700px;
  }
  .breadcrumb {
    border-radius: 4px;
    padding: 10px 15px;
    background: #fff;
  }
  .breadcrumb > li {
    display: inline-block;
    color: #777;
  }
  .breadcrumb > li + li:before {
    padding: 0 5px;
    color: #ccc;
    content: "/\00a0";
  }
  .breadcrumb > li > a {
    color: #32475f;
    text-decoration: none;
  }


</style>