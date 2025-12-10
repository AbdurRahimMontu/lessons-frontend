import { useRef, useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/celebration.json";

export default function LottieAnimation({ onClose }) {
  const lottieRef = useRef();

  useEffect(() => {
    // restart animation from frame 0
    setTimeout(() => {
      lottieRef.current.stop();
      lottieRef.current.play();
    }, 50);

    // auto close after animation finished (2 sec)
    setTimeout(() => {
      onClose();
    }, 2000);
  }, [onClose]);

  return (
    <div style={styles.wrapper} onClick={onClose}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={false}
        loop={false}
        style={styles.lottie}
      />
    </div>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    cursor: "pointer",
  },
  lottie: {
    width: "80%",
    height: "80%",
  },
};
