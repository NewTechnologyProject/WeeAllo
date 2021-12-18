import * as React from "react";

import Register from "../Authentication/Register";

import RegisterOTP from "../Authentication/RegisterOTP";
import ForgotPass from "../Authentication/ForgotPass";
import ForgotOTP from "../Authentication/ForgotOTP";
import ForgotNewPass from "../Authentication/ForgotNewPass";

import MyContact from "../Screen/Contact/Tab/MyContact/MyContact";
import ChatContent from "../Screen/Chat/ChatScreen/ChatContent";
import GroupInformation from "../Screen/Contact/Tab/GroupInformation/GroupInformation";
import GroupMembers from "../Screen/Contact/Tab/GroupInformation/GroupMembers";
import GroupMedia from "../Screen/Contact/Tab/GroupInformation/GroupMedia";
import GroupFile from "../Screen/Contact/Tab/GroupInformation/GroupFile";
import DeviceContact from "../Screen/Contact/Tab/MyContact/DeviceContact";
import Login from "../Authentication/Login";
import TabRoute from "./TabRoute";
import AddGroup from "../Screen/Contact/Tab/AddGroup/AddGroup";
import addMember from "../Screen/Contact/Tab/AddMember/addMember";
import DetailContact from "../Screen/Contact/Tab/MyContact/DetailContact";
import Chat from "../Screen/Chat/Chat";
import EditProfile from "../Screen/Profile/EditProfile";
import Profile1 from "../Screen/Profile/Profile1";
import Scanner from "../Screen/Contact/Tab/Scanner";
import MyQr from "../Screen/Contact/Tab/MyQr";
import QrTab from "../Screen/Contact/Tab/QrTab";

export default function MainStack(Stack) {
  return (
    <>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="TabRoute" component={TabRoute} />
      <Stack.Screen name="ChatContent" component={ChatContent} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterOTP" component={RegisterOTP} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
      <Stack.Screen name="ForgotOTP" component={ForgotOTP} />
      <Stack.Screen name="ForgotNewPass" component={ForgotNewPass} />

      <Stack.Screen name="GroupInformation" component={GroupInformation} />
      <Stack.Screen name="GroupMembers" component={GroupMembers} />
      <Stack.Screen name="GroupMedia" component={GroupMedia} />
      <Stack.Screen name="GroupFile" component={GroupFile} />

      <Stack.Screen name="MyContact" component={MyContact} />
      <Stack.Screen name="DeviceContact" component={DeviceContact} />
      <Stack.Screen name="AddGroup" component={AddGroup} />
      <Stack.Screen name="AddMember" component={addMember} />
      <Stack.Screen name="DetailContact" component={DetailContact} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="QrTab" component={QrTab} />
    </>
  );
}
