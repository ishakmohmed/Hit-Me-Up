const newMsgSound = (senderName) => {
  const sound = new Audio("/light.mp3");

  sound && sound.play();

  if (senderName) {
    document.title = `${senderName} sent a message`;

    if (document.visibilityState === "visible") {
      setTimeout(() => {
        document.title = "Messages";
      }, 5000);
    }
  }
};

export default newMsgSound;
