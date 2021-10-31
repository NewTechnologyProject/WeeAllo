import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import ContactPhoneIcon from "@iconify/icons-eva/phone-fill";
import fileTextFill from "@iconify/icons-eva/message-circle-fill";
import personFill from "@iconify/icons-eva/person-fill";
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    path: "/dashboard/app",
    icon: getIcon(pieChart2Fill),
  },
  {
    path: "/dashboard/user",
    icon: getIcon(personFill),
  },
  {
    path: "/dashboard/contact",
    icon: getIcon(ContactPhoneIcon),
  },
  {
    path: "/dashboard/groups",
    icon: getIcon(peopleFill),
  },
  {
    path: "/dashboard/chat",
    icon: getIcon(fileTextFill),
  },
];

export default sidebarConfig;
