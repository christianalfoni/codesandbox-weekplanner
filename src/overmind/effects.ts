import { User } from "firebase";
import { BacklogItems, BacklogItem, Days, DaysByBacklogItem } from "./state";
import { Profile } from "./auth/state";
import { getFirstDayOfLastWeek } from "./utils";

export const browser = {
  isIframe: () => window.self !== window.top
};

export const api = (() => {
  let firebase: typeof import("firebase");
  let app;
  let disposeStreamBacklog: () => void;
  let disposeStreamWeekDays: () => void;

  function getDoc(profile: Profile) {
    return firebase
      .firestore()
      .collection(profile.familyUid ? "families" : "profiles")
      .doc(profile.familyUid || profile.uid);
  }

  return {
    initialize: async (onAuthChanged: (user: User | null) => void) => {
      firebase = await import("firebase");

      app = firebase.initializeApp({
        apiKey: "AIzaSyBA2Ycq_DN69Tm8b9P7WwYeRXqmsJhMEJc",
        authDomain: "family-scrum-dev.firebaseapp.com",
        databaseURL: "https://family-scrum-dev.firebaseio.com",
        projectId: "family-scrum-dev",
        storageBucket: "family-scrum-dev.appspot.com",
        messagingSenderId: "354129771005",
        appId: "1:354129771005:web:32e421d62125017c"
      });

      firebase.auth().onAuthStateChanged(onAuthChanged);
    },
    signIn: () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
    signOut: () => {
      firebase.auth().signOut();
    },
    async getProfile(user: User): Promise<Profile> {
      const doc = await firebase
        .firestore()
        .collection("profiles")
        .doc(user.uid)
        .get();
      let data = doc.data();

      if (!data) {
        data = {
          name: user.displayName
        };
        await firebase
          .firestore()
          .collection("profiles")
          .doc(user.uid)
          .set(data);
      }

      return {
        ...data,
        uid: user.uid
      } as Profile;
    },
    streamBacklog(
      profile: Profile,
      action: (backlogItems: BacklogItems) => void
    ) {
      if (disposeStreamBacklog) {
        disposeStreamBacklog();
      }

      disposeStreamBacklog = getDoc(profile)
        .collection("backlog")
        .onSnapshot((snapshot) => {
          const docs: BacklogItems = {};
          snapshot.docs.forEach((backlogItem) => {
            docs[backlogItem.id] = {
              ...backlogItem.data(),
              id: backlogItem.id
            } as BacklogItem;
          });
          action(docs);
        });
    },
    streamWeekDays(profile: Profile, action: (days: Days) => void) {
      if (disposeStreamWeekDays) {
        disposeStreamWeekDays();
      }

      disposeStreamWeekDays = getDoc(profile)
        .collection("weekDays")
        .where(
          firebase.firestore.FieldPath.documentId(),
          ">=",
          getFirstDayOfLastWeek()
        )
        .onSnapshot((snapshot) => {
          const docs: DaysByBacklogItem = {};
          snapshot.docs.forEach((day) => {
            const doc = day.data() as {
              [uid: string]: { [backlogItemId: string]: true };
            };

            Object.keys(doc).forEach((uid) => {
              Object.keys(doc[uid]).forEach((backlogItemId) => {
                if (!docs[backlogItemId]) {
                  docs[backlogItemId] = {};
                }
                if (!docs[backlogItemId][uid]) {
                  docs[backlogItemId][uid] = [];
                }

                docs[backlogItemId][uid].push(day.id);
              });
            });
          });

          action(docs);
        });
    },
    disposeStreamBacklog() {
      if (disposeStreamWeekDays) {
        disposeStreamWeekDays();
      }
    },
    createBacklogItem(profile: Profile) {
      return getDoc(profile).collection("backlog").doc();
    },
    addBacklogItem(
      doc: firebase.firestore.DocumentReference<
        firebase.firestore.DocumentData
      >,
      data: {
        description: string;
        date?: number;
      }
    ) {
      return doc.set({
        ...data,
        created: firebase.firestore.FieldValue.serverTimestamp()
      });
    },
    setBacklogItemOnWeekDay(
      profile: Profile,
      weekDayId: string,
      backlogItemId: string
    ) {
      return getDoc(profile)
        .collection("weekDays")
        .doc(weekDayId)
        .set(
          {
            [profile.uid]: {
              [backlogItemId]: true
            }
          },
          {
            merge: true
          }
        );
    }
    // Delete a field firebase.firestore.FieldValue.delete()
  };
})();
