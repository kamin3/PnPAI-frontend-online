export const CONFIG = {
  dashboard: {
    name: 'dashboard',
    route: '/dashboard',
    children: {
      dashboard: { name: '', route: '/dashboard' },
      newUseCase: { name: 'newusecase', route: '/dashboard/newusecase' },
      org: { name: 'org', route: '/dashboard/org' },
      teams: { name: 'teams', route: '/dashboard/teams' },
      usecases: { name: 'usecases', route: '/dashboard/usecases' },
      support: {
        name: 'support',
        route: '/dashboard/support',
        children: {
          overview: { name: 'overview', route: '/dashboard/support/overview' },
          tickets: { name: 'tickets', route: '/dashboard/support/tickets' },
          tutorial: { name: 'tutorial', route: '/dashboard/support/tutorial' },
          faq: { name: 'faq', route: '/dashboard/support/faq' },
          license: { name: 'license', route: '/dashboard/support/license' },
          contactus: { name: 'contactus', route: '/dashboard/support/contactus' },
        },
      },
    },
  },
  auth: {
    name: '',
    route: '/',
    children: {
      login: { name: 'login', route: '/login' },
      register: { name: 'register', route: '/register' },
    },
  },
  landing: {
    name: 'home',
    route: '/home',
    children: {
      landing: { name: '', route: '/home' },
      checkoutresult: { name: 'checkoutresult', route: '/home/checkoutresult' },
      privacypolicy: { name: 'privacypolicy', route: '/home/privacypolicy' },
      faq: { name: 'faq', route: '/home/faq' },
    },
  },
};
