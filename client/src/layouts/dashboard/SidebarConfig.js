import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    path: '/dashboard/products',
    icon: getIcon(shoppingBagFill)
  },
  {
    path: '/dashboard/chat',
    icon: getIcon(fileTextFill)
  },
  {
    path: '/login',
    icon: getIcon(lockFill)
  },
  {
    path: '/register',
    icon: getIcon(personAddFill)
  },
  {
    path: '/404',
    icon: getIcon(alertTriangleFill)
  }
];

export default sidebarConfig;
