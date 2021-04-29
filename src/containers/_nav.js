export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Theme']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Users',
        to: '/dash/users',
        icon: 'cil-user'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Clients',
        to: '/dash/clients',
        icon: 'cil-user'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Candidates',
        to: '/dash/candidates',
        icon: 'cil-user'
      }
    ]
  }
]