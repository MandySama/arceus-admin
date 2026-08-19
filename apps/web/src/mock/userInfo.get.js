import { defineHandler } from 'nitro'

const routeList = [
  {
    menuId: 1,
    menuName: '权限管理',
    menuType: 'dir',
    icon: 'ant-design:apartment-outlined',
    routePath: '/admin',
    children: [
      {
        menuId: 101,
        menuName: '用户管理',
        menuType: 'menu',
        icon: 'ant-design:user-outlined',
        routePath: '/admin/user',
        children: null,
      },
      {
        menuId: 102,
        menuName: '角色管理',
        menuType: 'menu',
        icon: 'ant-design:team-outlined',
        routePath: '/admin/role',
        children: null,
      },
      {
        menuId: 103,
        menuName: '菜单管理',
        menuType: 'menu',
        icon: 'ant-design:appstore-outlined',
        routePath: '/admin/menu',
        children: null,
      },
    ],
  },
  {
    menuId: 2,
    menuName: '系统管理',
    menuType: 'dir',
    icon: 'ep:setting',
    routePath: '/system',
    children: [
      {
        menuId: 201,
        menuName: '字典管理',
        menuType: 'menu',
        icon: 'ep:collection',
        routePath: '/system/dict',
        children: null,
      },
      {
        menuId: 202,
        menuName: '参数管理',
        menuType: 'menu',
        icon: 'ep:operation',
        routePath: '/system/param',
        children: null,
      },
      {
        menuId: 3,
        menuName: '日志管理',
        menuType: 'dir',
        icon: 'ep:cloudy',
        routePath: '/system/log',
        children: [
          {
            menuId: 301,
            menuName: '登录日志',
            menuType: 'menu',
            icon: 'ant-design:contacts-outlined',
            routePath: '/system/loginLog',
            children: null,
          },
          {
            menuId: 302,
            menuName: '操作日志',
            menuType: 'menu',
            icon: 'ep:document',
            routePath: '/system/operLog',
            children: null,
          },
        ],
      },
    ],
  },
]

export default defineHandler(() => {
  return {
    code: 200,
    data: {
      routeList,
    },
    message: null,
  }
})
