import * as React from "react";
import ChatContent from "../Screen/Chat/ChatScreen/ChatContent";
import GroupInformation from "../Screen/Contact/Tab/GroupInformation/GroupInformation";
import GroupMembers from "../Screen/Contact/Tab/GroupInformation/GroupMembers";
import GroupMedia from "../Screen/Contact/Tab/GroupInformation/GroupMedia";
import TabRoute from "./TabRoute";

export default function MainStack(Stack) {
  return (
    <>
      <Stack.Screen name="TabRoute" component={TabRoute} />
      <Stack.Screen name="ChatContent" component={ChatContent} />
      <Stack.Screen name="GroupInformation" component={GroupInformation} />
      <Stack.Screen name="GroupMembers" component={GroupMembers} />
      <Stack.Screen name="GroupMedia" component={GroupMedia} />
    </>
  );
}
