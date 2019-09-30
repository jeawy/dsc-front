import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/layout'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

export const asyncRoutes = [{
        path: '/task',
        component: Layout,
        redirect: '/task',
        meta: {
            title: '我的工作台',
            icon: 'task'
        },
        children: [{
                path: 'approve',
                name: 'approve',
                component: () =>
                    import ('@/views/video/my-audit'),
                meta: {
                    title: '我的审批',
                    icon: 'v2',
                    roles: 'manage_approve'
                }
            },
            {
                path: '/check-video',
                name: 'check-video',
                component: () =>
                    import ('@/views/video/video-check'),
                meta: {
                    title: '审核意见',
                    activeMenu: '/task/approve'
                },
                hidden: true
            },
        ]
    }, {
        path: '/admin',
        component: Layout,
        redirect: '/admin', //点击2级面包屑对应哪个路由
        meta: {
            title: '系统设置',
            icon: 'settings'
        },
        children: [{
                path: 'profession', //直接写字符串会生成/admin/profession   如果前面带/就是绝对路径了，会生成 /profession
                name: 'profession',
                component: () =>
                    import ('@/views/admin/userGroup'),
                meta: {
                    title: '用户',
                    icon: 'group'
                }
            },
            {
                path: 'userGroup',
                name: 'UserGroup',
                component: () =>
                    import ('@/views/admin/profession'),
                meta: {
                    title: '部门及工种',
                    icon: 'profession'
                }
            },
            {
                path: 'roles',
                name: 'UserGqqqroup',
                component: () =>
                    import ('@/views/admin/roles'),
                meta: {
                    title: '角色管理',
                    icon: 'role',
                    roles: 'manage_role'
                }
            },
            {
                path: 'bind',
                name: 'settings',
                component: () =>
                    import ('@/views/admin/bind'),
                meta: {
                    title: '绑定',
                    icon: 'bangding'
                }
            },
            {
                path: 'attrs',
                name: 'customAttrs',
                component: () =>
                    import ('@/views/admin/customAttrs'),
                meta: {
                    title: '自定义属性',
                    icon: 'custom-attrs',
                    // roles: 'manage_role'
                }
            },
            {
                path: 'time-management',
                name: 'time-management',
                component: () =>
                    import ('@/views/admin/time-management'),
                meta: {
                    title: '时间管理',
                    icon: 'fs',
                    // roles: 'manage_role'
                }
            },
        ]
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path*',
            component: () =>
                import ('@/views/redirect/index')
        }]
    }, {
        path: '/login',
        component: () =>
            import ('@/views/login/signin'),
        hidden: true
    },
    {
        path: '/login-task',
        component: () =>
            import ('@/views/myTask/loginMyTask'),
        hidden: true
    },
    {
        path: '/mytaskplug',
        component: () =>
            import ('@/views/myTask/myTaskPlug'),
        hidden: true
    },
    {
        path: '/forgot',
        component: () =>
            import ('@/views/login/passwordReset'),
    },
    {
        path: '/signup',
        component: () =>
            import ('@/views/login/signup'),
    },
    {
        path: '/',
        component: Layout,
        redirect: {
            name: 'overview-project'
        },
        meta: {
            title: '概览',
            icon: 'gailan'
        },
        children: [{
                path: '/overview/project',
                name: 'overview-project',
                component: () =>
                    import ('@/views/overview/project'),
                meta: {
                    title: '项目概览',
                    icon: 'tree'
                },
            },
            {
                path: '/overview/training',
                name: 'overview-training',
                component: () =>
                    import ('@/views/training/training-project'),
                meta: {
                    title: '实训项目',
                    icon: 'tree2'
                },
            }
        ]
    },
    {
        path: '/projects',
        component: Layout,
        redirect: '/projects',
        meta: {
            title: '项目',
            icon: 'tree-table',
            hiddenSideBar: true
        },
        hidden: true,
        children: [{
            path: 'project-detail/:id',
            name: 'project-detail',
            component: () =>
                import ('@/views/projects/project-detail'),
            meta: {
                title: '项目详情',
                icon: 'tree',
                hiddenSideBar: true
            }
        }]
    },
    {
        path: '/import',
        component: Layout,
        redirect: '/import',
        meta: {
            title: '批量上传',
            icon: 'tree-table',
            hiddenSideBar: true
        },
        hidden: true,
        children: [{
                path: 'import-users',
                name: 'import-users',
                component: () =>
                    import ('@/views/admin/user-import'),
                meta: {
                    title: '用户上传',
                    icon: 'tree',
                    hiddenSideBar: true
                }
            },
            {
                path: 'date-import',
                name: 'date-import',
                component: () =>
                    import ('@/views/admin/date-import'),
                meta: {
                    title: '用户上传',
                    icon: 'tree',
                    hiddenSideBar: true
                }
            }
        ]
    },
    {
        path: '/task',
        component: Layout,
        redirect: '/task',
        meta: {
            title: '我的工作台',
            icon: 'task'
        },
        children: [{
            path: 'task',
            name: 'my-task',
            component: () =>
                import ('@/views/task'),
            meta: {
                title: '我的任务',
                icon: 'task'
            }
        }]
    },
    {
        path: '/production',
        component: Layout,
        redirect: '/production',
        meta: {
            title: '作品',
            icon: 'pd'
        },
        children: [{
            path: 'my-production',
            name: 'my-production',
            component: () =>
                import ('@/views/production'),
            meta: {
                title: '我的作品',
                icon: 'pd'
            }
        }]
    },
    {
        path: '/task',
        component: Layout,
        redirect: '/task',
        meta: {
            title: '我的工作台',
            icon: 'task'
        },
        children: [{
            path: 'overview-users1',
            name: 'overview-users1',
            component: () =>
                import ('@/views/overview/users'),
            meta: {
                title: '我的工时',
                icon: 'fs'
            },
        }]
    },
    {
        path: '/task',
        component: Layout,
        redirect: '/task',
        meta: {
            title: '我的工作台',
            icon: 'task'
        },
        children: [{
            path: 'overview-users2',
            name: 'overview-users2',
            component: () =>
                import ('@/views/overview/users'),
            meta: {
                title: '我的信息',
                icon: 'zl'
            },
        }, ]
    },
    {
        path: '/plugin',
        component: Layout,
        redirect: '/plugin',
        meta: {
            title: '插件',
            icon: 'assets'
        },
        children: [{
            path: 'plugin',
            name: 'plugin',
            component: () =>
                import ('@/views/plugin'),
            meta: {
                title: '插件管理',
                icon: 'assets'
            }
        }]
    },
    {
        path: '/assetes',
        component: Layout,
        alwaysShow: true,
        hidden: true,
        redirect: '/assetes',
        meta: {
            title: '资产管理',
            icon: 'assets'
        },
        children: [{
            path: 'asset-list',
            name: 'asset-list',
            component: () =>
                import ('@/views/assetsManagement/asset-list'),
            meta: {
                title: '资产列表',
                icon: 'assetlist'
            }
        }, {
            path: 'asset-import/:id',
            name: 'asset-import',
            component: () =>
                import ('@/views/assetsManagement/asset-import'),
            meta: {
                title: '批量导入',
                icon: 'assetlist'
            },
            hidden: true
        }, ]
    }, {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    }
]
const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router