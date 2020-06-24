import React from 'react';
import { useSpring, animated } from 'react-spring';
import './Logo.css';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(100px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

function Logo() {
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
  return (
    <div className='ma4 mt0 container'>
      <animated.div
      className="card"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.interpolate(trans) }}
      />
    </div>
  )
}

export default Logo;