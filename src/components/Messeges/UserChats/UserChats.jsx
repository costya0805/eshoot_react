import React from "react";
import { observer } from "mobx-react-lite";
import Chat from "../UserChat/Chat";
import { getFirestore, collection, query, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import currentUser from "../../../store/currentUser";

import s from "./UserChats.module.css";

const UserChats = observer(() => {
  const currentUserID = currentUser.user.id;
  const db = getFirestore();
  const users_colletion = query(
    collection(db, `userMesseges/${currentUserID}/users`),
    orderBy("lastMessege.date", "desc")
  );
  const [users, users_loading] = useCollectionData(users_colletion);
  console.log(users);
  return (
    <div className={s.body}>
      {!users_loading &&
        users.map((user) => (
          <Chat
            user_id={user.user_id}
            user_info={user.user_info}
            lastMessage={user.lastMessege}
            key={user.user_id}
          />
        ))}
    </div>
  );
});

export default UserChats;
