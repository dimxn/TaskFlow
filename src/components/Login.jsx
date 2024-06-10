import { FcGoogle } from "react-icons/fc";
import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { auth, firestore } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, writeBatch, collection } from "firebase/firestore";
import INTRO1 from "../assets/images/intro1.svg";
import INTRO2 from "../assets/images/intro2.svg";
import INTRO3 from "../assets/images/intro3.svg";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";

const Item = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
      }}
    >
      <img src={props.item.image} width={300} height={300} alt="image1" />
      <h2>{props.item.title}</h2>
      <p style={{ textAlign: "center" }}>{props.item.desc}</p>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const userRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          const batch = writeBatch(firestore);
          batch.set(userRef, {
            userName: user.displayName || "New User",
            avatar: user.photoURL || "avatar.png",
          });
          const projects = ["Особисте", "Робота", "Інше"];
          projects.forEach((projectName) => {
            const projectRef = doc(collection(userRef, "projects"));
            batch.set(projectRef, { name: projectName });
          });

          const taskRef = doc(collection(userRef, "tasks"));
          batch.set(taskRef, {
            text: 'Привіт друже! Вітаю в TaskFlow, щоб додати якесь завдання, натисни на "Новий запис"',
            date: dayjs().format("DD.MM.YYYY"),
            project: "Особисте",
            color: "green",
            checked: false,
            time: dayjs().format("HH:mm"),
          });
          await batch.commit();
        }

        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };

  const items = [
    {
      image: INTRO1,
      title: "Керуйте своїми завданнями",
      desc: "Ви можете легко керувати всіма своїми щоденними завданнями в TaskFlow безкоштовно",
    },
    {
      image: INTRO2,
      title: "Створіть розпорядок дня",
      desc: "У TaskFlow ви можете створити свій персоналізований розпорядок, щоб залишатися продуктивним",
    },
    {
      image: INTRO3,
      title: "Організуйте свої завдання",
      desc: "Ви можете організувати свої щоденні завдання, додавши їх в окремі категорії",
    },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="login-container">
          <Carousel
            animation="slide"
            navButtonsAlwaysVisible={false}
            autoPlay={true}
          >
            {items.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
          <h1>TaskFlow</h1>
          <button className="google-auth" onClick={signInWithGoogle}>
            <FcGoogle />
            Авторизуватись через Google
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;
