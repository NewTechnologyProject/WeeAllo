import * as React from "react";
import MyContact from "../Screen/Contact/Tab/MyContact/MyContact";
import ChatContent from "../Screen/Chat/ChatScreen/ChatContent";
import GroupInformation from "../Screen/Contact/Tab/GroupInformation/GroupInformation";
import GroupMembers from "../Screen/Contact/Tab/GroupInformation/GroupMembers";
import GroupMedia from "../Screen/Contact/Tab/GroupInformation/GroupMedia";
import DeviceContact from "../Screen/Contact/Tab/MyContact/DeviceContact";
import Login from "../Authentication/Login";
import TabRoute from "./TabRoute";
import DetailContact from "../Screen/Contact/Tab/MyContact/DetailContact";
import Chat from "../Screen/Chat/Chat";
import EditProfile from "../Screen/Profile/EditProfile";
import Profile1 from "../Screen/Profile/Profile1";

export default function MainStack(Stack) {
  return (
    <>
      <Stack.Screen name="TabRoute" component={TabRoute} />
      <Stack.Screen name="ChatContent" component={ChatContent} />
      <Stack.Screen name="GroupInformation" component={GroupInformation} />
      <Stack.Screen name="GroupMembers" component={GroupMembers} />
      <Stack.Screen name="GroupMedia" component={GroupMedia} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MyContact" component={MyContact} />
      <Stack.Screen name="DeviceContact" component={DeviceContact} />
      <Stack.Screen name="DetailContact" component={DetailContact} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </>
  );
}
