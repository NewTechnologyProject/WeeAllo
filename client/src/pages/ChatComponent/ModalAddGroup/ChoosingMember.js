import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "src/actions/customer.action";
import ChosenMember from "./ChosenMember";
import ListFriendSearch from "./ListFriendsSearch";
import ActionButton from "./ActionButton";
import classes from "./ChoosingMember.module.css";

const ChoosingMember = (props) => {
  const userId = localStorage.getItem("user_authenticated");
  const [chosenMembers, setChosenMembers] = useState([]);
  let listFriends = useSelector((state) => state.customer.listFriends);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchAllFriend(userId));
  }, []);

  //Filter friends by keyword
  if (listFriends.length > 0 && props.keyWord) {
    listFriends = listFriends.filter((friend) =>
      friend.firstname.includes(props.keyWord)
    );
  }

  //Return chosen members
  props.onGetChosenMembers(chosenMembers);

  //Auto checked
  if (listFriends.length > 0) {
    for (let i = 0; i < listFriends.length; i++) {
      const friend = chosenMembers.find(
        (member) => member.id === listFriends[i].id
      );
      let checked = false;

      if (friend) {
        checked = true;
      }

      listFriends[i] = { ...listFriends[i], checked: checked };
    }
  }

  const deleteMemberHandler = (member) => {
    const updatedChosenMember = chosenMembers.filter(
      (mem) => mem.id !== member.id
    );
    setChosenMembers(updatedChosenMember);
  };

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
    <Fragment>
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

      {/* buttons */}
      <ActionButton
        onCloseModal={props.onCloseModal}
        chosenMembers={chosenMembers}
        helperText={props.helperText}
      />
    </Fragment>
  );
};

export default ChoosingMember;
