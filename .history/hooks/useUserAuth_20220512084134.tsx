import { getAuth, onAuthStateChanged } from "firebase/auth";
import { atom, useRecoilState } from "recoil";
import * as React from "react";

// import my File
import { User } from "../models/User";

// Create State Model
export const userState = atom<User | null>({
  key: "user",
  default: null,
});

const AuthContext = React.createContext({
  user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState(null);
  // const {showErrorMessage} = useAlert()
  React.useEffect(() => {
    if (user !== null) {
      return;
    }
    const auth = getAuth();
    //認証終了後...
    try {
      onAuthStateChanged(auth, function (firebaseUser) {
        if (firebaseUser) {
          const loginUser: User = {
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
          };
          setUser(loginUser);
          // CreateUserIfNotFound(loginUser)
        } else {
          setUser(null);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
