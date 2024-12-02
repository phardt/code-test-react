import { Suspense } from 'react'
import Loader from '../views/loader/loader'
import { BrowserRouter, Route, Routes } from 'react-router'
import FindUser from '../views/git-user/find-user'
import ProfileDetail from '../views/git-user/profile-detail'
import RepositoryDetailView from '../views/repository/repository-detail'

function AppRoutes() {
  return (
    <Suspense fallback={
      <Loader />
    }>
      <BrowserRouter>
        <Routes>
          <Route key="app-route-find-user" element={<FindUser />} path="/" />
          <Route key="app-route-find-user" element={<ProfileDetail />} path="/profile-detail/:userName" />
          <Route key="app-route-find-user" element={<RepositoryDetailView />} path="/repository/:user/:repoName" />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export {
  AppRoutes
}