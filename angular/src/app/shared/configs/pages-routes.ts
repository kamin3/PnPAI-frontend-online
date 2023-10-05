export const CONFIG = {
  home: {
    name: 'home', route: '/home',
    children: {
      dashboard: { name: 'dashboard', route: '/home/dashboard' },
      newUseCase: { name: 'newusecase', route: '/home/newusecase' },
      org: { name: 'org', route: '/home/org' },
      teams: { name: 'teams', route: '/home/teams' },
      usecases: { name: 'usecases', route: '/home/usecases' },
      support: {
        name: 'support', route: '/home/support',
        children: {
          overview: { name: 'overview', route: '/home/support/overview' },
          tickets: { name: 'tickets', route: '/home/support/tickets' },
          tutorial: { name: 'tutorial', route: '/home/support/tutorial' },
          faq: { name: 'faq', route: '/home/support/faq' },
          license: { name: 'license', route: '/home/support/license' },
          contactus: { name: 'contactus', route: '/home/support/contactus' },
        }
      },
    }
  },
  auth: {
    name: 'auth', route: '/auth',
    children: {
      login: { name: 'login', route: '/auth/login' },
      register: { name: 'register', route: '/auth/register' },
    }
  },
};
