import { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react';
import { Theme, useTheme } from '~/components/theme';
import { motion } from 'framer-motion';
import { useTransition } from '@remix-run/react';
import { NabvarProgress } from '~/components/Navbar/navbar-progress';

type Rgb = {
  r: number;
  g: number;
  b: number;
};
export function LandingBackground(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement
  >
) {
  const [theme] = useTheme();

  const { state } = useTransition();
  useEffect(() => {
    const canvas: HTMLCanvasElement | null = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    if (!canvas) {
      throw Error('No element with id canvas found');
    }
    const context = canvas.getContext('2d');

    if (!context) {
      throw Error('Could not create 2d context');
    }

    const baseColor: Rgb =
      theme === Theme.DARK
        ? {
            r: 86,
            g: 50,
            b: 192,
          }
        : {
            r: 85,
            g: 50,
            b: 233,
          };

    const targetColor: Rgb =
      theme === Theme.DARK
        ? {
            r: 142,
            g: 74,
            b: 174,
          }
        : {
            r: 164,
            g: 81,
            b: 207,
          };
    const targetColor2: Rgb =
      theme === Theme.DARK
        ? {
            r: 130,
            g: 87,
            b: 198,
          }
        : {
            r: 156,
            g: 109,
            b: 243,
          };

    const color = ({ r, g, b }: Rgb) => {
      return `rgb(${r}, ${g}, ${b})`;
    };

    let x = 1;
    let y = 0;

    let id = 0;

    let time = 0;
    const startAnimation = () => {
      time += 1;

      x += (1920 * Math.sin((Math.PI * time) / 1000)) / 10000;
      y += (1080 * Math.sin((Math.PI * time) / 1000)) / 10000;

      const gradient = context.createRadialGradient(
        x,
        y,
        40,
        x,
        y,
        200
      );

      gradient?.addColorStop(0, color(baseColor));
      gradient?.addColorStop(0.5, color(targetColor2));
      gradient?.addColorStop(1, color(targetColor));

      context.fillStyle = gradient;

      context?.fillRect(
        0,
        0,
        canvas.clientWidth,
        canvas.clientHeight
      );

      id = window.requestAnimationFrame(startAnimation);
    };

    startAnimation();
    return () => window.cancelAnimationFrame(id);
  }, [theme]);

  return (
    <>
      <div className="w-screen absolute -z-10">
        <svg viewBox="0 0 0 0" version="1.1">
          <defs>
            <clipPath
              id="landing-clip"
              clipPathUnits="objectBoundingBox"
            >
              <path
                d="M0,0.153 C0.063,0.27,0.128,0.344,0.193,0.375 C0.259,0.406,0.335,0.416,0.421,0.405 C0.489,0.405,0.557,0.449,0.627,0.537 C0.732,0.668,0.711,0.783,0.786,0.891 C0.836,0.964,0.908,1,1,1 L1,0 L0,0"
                id="Path"
              ></path>
            </clipPath>
          </defs>
        </svg>
      </div>
      {state === 'submitting' ? (
        <div className="absolute top-0 left-0 z-90 h-1 w-screen">
          <NabvarProgress />
        </div>
      ) : null}
      <motion.canvas
        animate={state === 'submitting' ? 'retract' : ''}
        variants={{
          retract: {
            transform: 'translate(0px, -700px)',
          },
        }}
        transition={{
          damping: 1,
        }}
        id="canvas"
        {...(props as any)}
        style={{
          clipPath: 'url(#landing-clip)',
        }}
      />
    </>
  );
}
