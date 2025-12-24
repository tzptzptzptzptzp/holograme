import { useChatMessages } from "./useChatMessages.hook";

export const useSendMessage = () => {
  const { messages: chatMessages, setMessages: setChatMessages } =
    useChatMessages();

  const generateMessage = (message: string, roomId: number, userId: string) => {
    const userMessage = {
      id: 2525252525252525,
      userId,
      roomId,
      content: message,
      role: "user" as "user",
      date: new Date(),
    };
    const assistantMessage = {
      id: 3939393939393939,
      userId,
      roomId,
      content: "考え中",
      role: "assistant" as "assistant",
      date: new Date(),
    };

    return {
      userMessage,
      assistantMessage,
    };
  };

  const sendMessage = (message: string, roomId: number, userId: string) => {
    const { userMessage, assistantMessage } = generateMessage(
      message,
      roomId,
      userId
    );
    const newMessages = [assistantMessage, userMessage, ...chatMessages];

    setChatMessages(newMessages);
  };

  return {
    sendMessage,
  };
};
