const menuItems = [
  // ... 現有的選單項目 ...
  {
    key: 'organization',
    icon: <TeamOutlined />,
    label: 'Organization',
    children: [
      {
        key: 'organizations',
        label: 'Organizations',
        path: '/admin/organizations'
      },
      {
        key: 'departments',
        label: 'Departments',
        path: '/admin/organizations'  // 這裡使用相同路徑，因為部門是在組織內管理
      }
    ]
  }
]; 