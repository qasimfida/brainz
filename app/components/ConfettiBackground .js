import { confetti } from "@tsparticles/confetti";
import { useEffect } from "react";
import icon1 from "@/public/images/gameResult.png";

export const ConfettiBackground = () => {
  useEffect(() => {
    const startConfetti = () => {
      const end = Date.now() + 5 * 1000;

      const frame = () => {
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }

        // confetti({
        //   particleCount: 25,
        //   angle: 60,
        //   spread: 70,
        //   origin: { x: 0 },
        // });

        confetti({
          particleCount: 25,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
        });
      };

      frame();
    };

    const timeoutId = setTimeout(startConfetti, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return <div></div>;
};
