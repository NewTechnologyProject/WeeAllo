import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "src/actions/customer.action";
import ChosenMember from "./ChosenMember";
import ListFriendSearch from "./ListFriendsSearch";
import classes from "./ChoosingMember.module.css";

const ChoosingMember = () => {
  const userId = localStorage.getItem("user_authenticated");
  const [chosenMembers, setChosenMembers] = useState([]);
  const listFriends = useSelector((state) => state.customer.listFriends);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchAllFriend(userId));
  }, []);

  const deleteMemberHandler = () => {};

  const checkMemberHandler = (event) => {
    const id = Number(event.target.value);
    if (event.target.checked) {
      const member = listFriends.find((friend) => friend.id === id);
      setChosenMembers((prevSate) => {
        return [...prevSate, member];
      });
    } else {
      const updatedListMember = chosenMembers.filter(
        (member) => member.id !== id
      );
      setChosenMembers(updatedListMember);
    }
  };

  return (
    <div className={classes["friends"]}>
      {/* current friends chat */}
      <ListFriendSearch
        listFriends={listFriends}
        onCheckMember={checkMemberHandler}
      />
      {/* choose members */}
      <ChosenMember
        chosenMembers={chosenMembers}
        onDeleteMember={deleteMemberHandler}
      />
    </div>
  );
};

export default ChoosingMember;
