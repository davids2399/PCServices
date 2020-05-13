import guest from './middleware/guest.js'
import authUser from './middleware/authUser.js'

const routes = [
  {
    path: '',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        name: 'dashboard',
        meta: {
          middleware: [
            authUser
          ]
        }
      },
      {
        path: '/engineers',
        component: () => import('pages/Engineers.vue'),
        children: [
          { path: '', component: () => import('components/engineers/engineerList.vue'), 
            meta: {
              middleware: [
                authUser
              ]
            },
          },
          { path: 'create', component: () => import('components/engineers/engineerCreate.vue'),
            meta: {
              middleware: [
                authUser
              ]
            },
          }
        ]
      },
      {
        path: '/companies',
        component: () => import('pages/Companies.vue'),
        meta: {
          middleware: [
            authUser
          ]
        },
        children:[
          { path: '', component: () => import('components/companies/companyList.vue') },
          { path: 'create', component: () => import('components/companies/companyCreate.vue') }
        ]
      },
      {
        path: '/computers', component: () => import('pages/Computers.vue'),
        meta: {
          middleware: [
            authUser
          ]
        },
        children: [
          { path: '', component: () => import('components/computers/computerList.vue') },
          { path: 'create', component: () => import('components/computers/computerCreate.vue') }
        ]
      },
      {
        path: '/reports', component: () => import('pages/Reports.vue'),
        meta: {
          middleware: [
            authUser
          ]
        },
        children: [
          { path: '', component: () => import('components/reports/reportList.vue') },
          { path: 'create', component: () => import('components/reports/reportCreate.vue') }
        ]
      },
      {
        path: '/scan', component: () => import('components/scan.vue'),
        meta: {
          middleware: [
            authUser
          ]
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    meta: {
      middleware: [
        guest
      ]
    },
    children: [
      { path: '', name: 'login', component: () => import('pages/Login.vue') },
    ]
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
