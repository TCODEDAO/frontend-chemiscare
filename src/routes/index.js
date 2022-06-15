import { lazy } from 'react'
const HomePage = lazy(() => import('./../components/HomePage/HomePage'))
const LearnPage = lazy(() => import('./../components/LearnPage/LearnPage'))
const AuthPage = lazy(() => import('./../features/Authenticate/AuthPage'))
const StartGame = lazy(() =>
    import('./../features/Games/Quiz/StartGameComponent/StartGameComponent'),
)
const InGame = lazy(() =>
    import('./../features/Games/Quiz/QuestionComponent/GameComponent'),
)
const detailInfo = lazy(() =>
    import('./../features/Authenticate/DetailUserInfomation'),
)
const rateComponent = lazy(() =>
    import('../components/RateComponents/RateComponent'),
)
const forumComponent = lazy(() => import('../features/Blog/BlogComponent'))
const celebrateComponent = lazy(() => import('../features/Celebrate/Celebrate'))
const rulesComponent = lazy(() => import('../features/rules/RuleComponent'))
//Public routes
const publicRoutes = [
    { id: 0, path: '/', index: true, component: HomePage },
    { id: 1, path: '/auth', component: AuthPage },
    { id: 2, path: '/forum', component: forumComponent },
    { id: 3, path: '/rules', component: rulesComponent },
    { id: 4, path: '/celebrate', component: celebrateComponent }

]

//Private routes
const privateRoutes = [
    { id: 0, path: '/learn', component: LearnPage },
    { id: 1, path: '/learn/start', component: StartGame },
    { id: 2, path: '/learn/game', component: InGame },
    { id: 3, path: '/auth/detail', component: detailInfo },
    { id: 4, path: '/learn/rate', component: rateComponent },
]

export { publicRoutes, privateRoutes }
