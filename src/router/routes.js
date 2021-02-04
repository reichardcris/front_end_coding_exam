
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', name: 'users', component: () => import('pages/UserLists/Index.vue') },
      { path: 'profile/:userId', name: 'album', component: () => import('pages/AlbumLists/Index.vue') },
      { path: 'photo/:albumId', name: 'photo', component: () => import('pages/PhotoLists/Index.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
