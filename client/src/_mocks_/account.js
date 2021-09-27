import { useSelector } from "react-redux";

// ----------------------------------------------------------------------
const account = () => {
  const user = useSelector((state) => state.customer.login);

  // console.log(user.firstname, user.email);

  return {
    displayName: `${user ? user.firstname : "Jaydon Frankie"}`,
    email: `${user ? user.email : "demo@minimals.cc"}`,
    photoURL: "/static/mock-images/avatars/avatar_default.jpg",
  };
};

export { account };
