
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/engineers', component: () => import('pages/Engineers.vue'),
        children:[
          { path: '', component: () => import('components/engineers/engineerList.vue') },
          { path: 'create', component: () => import('components/engineers/engineerCreate.vue') }
        ]
      },
      { path: '/companies', component: () => import('pages/Companies.vue'),
        children:[
          { path: '', component: () => import('components/companies/companyList.vue') },
          { path: 'create', component: () => import('components/companies/companyCreate.vue') }
        ]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
