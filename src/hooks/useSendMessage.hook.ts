import { useChatMessages } from './useChatMessages.hook';

export const useSendMessage = () => {
  const { messages: chatMessages, setMessages: setChatMessages } = useChatMessages();

  const generateMessage = (message: string) => {
    const userMessage = {
      id: 2525252525252525,
      userId: "user",
      roomId: 0,
      content: message,
      role: "user" as "user",
      date: new Date(),
    };
    const assistantMessage = {
      id: 3939393939393939,
      userId: "user",
      roomId: 0,
      content: "考え中",
      role: "assistant" as "assistant",
      date: new Date(),
    };

    return {
      userMessage,
      assistantMessage,
    };
  };

  const sendMessage = (message: string) => {
    const { userMessage, assistantMessage } = generateMessage(message);
    const newMessages = [assistantMessage, userMessage, ...chatMessages];

    setChatMessages(newMessages);
  };

  return {
    sendMessage,
  };
};
