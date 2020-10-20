import { Statemachine, statemachine } from "overmind";

type States =
  | {
      current: "HIDE";
    }
  | {
      current: "SHOW";
      content: string;
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
  ADDED: (_, content) => {
    return { current: "SHOW", content };
  },
  EXPIRED: () => ({ current: "HIDE" })
});

export const createNotificationMachine = () => {
  return notificationMachine.create({ current: "HIDE" });
};
