import { Statemachine, statemachine } from "overmind";

type States = (
  | {
      current: "HIDE";
    }
  | {
      current: "SHOW";
      content: string;
    }
) & {
  content?: string;
};

type Events =
  | {
      type: "ADDED";
      data: string;
    }
  | {
      type: "EXPIRED";
    };

export type NotificationMachine = Statemachine<States, Events>;

export const notificationMachine = statemachine<States, Events>({
  ADDED: (state, content) => {
    state.content = content;
    return "SHOW";
  },
  EXPIRED: () => "HIDE"
});

export const createNotificationMachine = () => {
  return notificationMachine.create({ current: "HIDE" });
};
