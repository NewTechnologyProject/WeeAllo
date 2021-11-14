import * as React from "react";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import ChatContent from "../Screen/Chat/ChatScreen/ChatContent";
import DeviceContact from "../Screen/Contact/Tab/MyContact/DeviceContact";
import MyContact from "../Screen/Contact/Tab/MyContact/MyContact";
import TabRoute from "./TabRoute";
import RegisterOTP from "../Authentication/RegisterOTP";
import ForgotPass from "../Authentication/ForgotPass";
import ForgotOTP from "../Authentication/ForgotOTP";
import ForgotNewPass from "../Authentication/ForgotNewPass";

export default function MainStack(Stack) {
  return (
    <>
      <Stack.Screen name="TabRoute" component={TabRoute} />
      <Stack.Screen name="ChatContent" component={ChatContent} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MyContact" component={MyContact} />
      <Stack.Screen name="DeviceContact" component={DeviceContact} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterOTP" component={RegisterOTP} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
      <Stack.Screen name="ForgotOTP" component={ForgotOTP} />
      <Stack.Screen name="ForgotNewPass" component={ForgotNewPass} />
    </>
  );
}
