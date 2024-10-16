import type { PropsWithChildren } from "react"
import { useCallback, useRef, useState } from "react"
import type { MarqueeProps } from "react-fast-marquee"
import Marquee from "react-fast-marquee"

export const TitleMarquee = ({
  children,
  speed = 30,
  play,
  ...rest
}: PropsWithChildren & MarqueeProps) => {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const $wrapper = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={$wrapper}
      onMouseEnter={useCallback(() => {
        const $container = ref.current

        if (!$container) return

        const $child = $container.querySelector(".rfm-child")
        if (!$child) return

        const canScroll = $child.clientWidth > $container.clientWidth

        if (!canScroll) return

        setHovered(true)
      }, [])}
      onMouseLeave={useCallback(() => {
        setHovered(false)

        const $container = ref.current
        if (!$container) return
        const marqueeContainer = $container
        const marqueeChildren = Array.from(
          marqueeContainer.children,
        ) as HTMLElement[]

        // Force a reflow on marquee child nodes to reset animation
        marqueeChildren.forEach((marquee: HTMLElement) => {
          marquee.style.animation = "none"
          void marquee.offsetHeight
          marquee.style.animation = ""
        })
      }, [])}
    >
      <Marquee play={hovered} ref={ref} speed={speed} {...rest}>
        {children}
      </Marquee>
    </div>
  )
}
