interface RouteProps {
  path: string,
  component: string,
  index?: boolean
}

const routes: RouteProps[] = [
  {
    path: '/',
    component: './views/git-user/find-user',
  },
  {
    path: '/profile-detail/:userName',
    component: './views/git-user/profile-detail',
  },
  {
    path: '/repository/:user/:repoName',
    component: './views/repository/repository-detail',
  },
]

export {
  routes
}