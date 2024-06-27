import { ChatMessageState } from "@/recoil/atoms.recoil";
import { useRecoilState } from "recoil";

export const useSendMessage = () => {
  const [state, setState] = useRecoilState(ChatMessageState);

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
    const newMessages = [assistantMessage, userMessage, ...state.messages];

    setState({
      isThinking: true,
      name: state.name,
      description: state.description,
      defaultMessage: state.defaultMessage,
      roomId: state.roomId,
      messages: newMessages,
    });
  };

  return {
    sendMessage,
  };
};
