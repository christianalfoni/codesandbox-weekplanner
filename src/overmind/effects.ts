import { User } from "firebase";
import { BacklogItems, BacklogItem, WeekDays } from "./state";
import { Profile } from "./auth/state";

export const api = (() => {
  let firebase: typeof import("firebase");
  let app;
  let disposeStreambacklog: () => void;

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
    async getProfile(user: User): Promise<Profile> {
      const doc = await firebase
        .firestore()
        .collection("profiles")
        .doc(user.uid)
        .get();
      const data = doc.data();

      if (data) {
        return {
          ...data,
          uid: user.uid
        } as Profile;
      }

      throw new Error("Missing profile");
    },
    streamBacklog(
      profile: Profile,
      action: (backlogItems: BacklogItems) => void
    ) {
      this.disposeStreamBacklog();
      disposeStreambacklog = getDoc(profile)
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
    disposeStreamBacklog() {
      if (disposeStreambacklog) {
        disposeStreambacklog();
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
