import React from "react";

function Chat({ isFirst }) {
  return (
    <div className="chatBody" style={styles.chatBody}>
      <div className="chatLogo" style={styles.chatLogo}></div>
      <div
        className="chatInfo"
        style={isFirst ? styles.chatInfoFirst : styles.chatInfo}
      >
        <div className="headChatMessege" style={styles.headChatMessege}>
          <div className="chatName" style={styles.chatName}>
            Иванов Иван
          </div>
          <div className="lastUpdate caption">16:20</div>
        </div>
        <div className="botChatMessege" style={styles.botChatMessege}>
          <div className="lastMessege">
            <span className="UserMessege">Вы:</span> Привет!
          </div>
          <div className="unreadCount">1</div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

const styles = {
  chatBody: {
    backgroundColor: "white",
    width: "100%",
    height: 64,
    position: "relative",
    display: "flex",
    cursor: "pointer",
  },
  chatLogo: {
    backgroundColor: "#7d94df",
    margin: 8,
    borderRadius: 50,
    width: 48,
  },
  chatInfo: { borderTop: "1px solid #8A8282", width: 300 - (48 + 16) },
  chatInfoFirst: { width: 300 - (48 + 16) },
  headChatMessege: {
    marginTop: 12,
    display: "flex",
    justifyContent: "space-between",
    paddingRight: 8,
    alignItems: "center",
  },
  chatName: { fontWeight: 500 },
  botChatMessege: {
    marginTop: 6,
    display: "flex",
    justifyContent: "space-between",
    paddingRight: 8,
  },
};
