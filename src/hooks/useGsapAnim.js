import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import TextPlugin from 'gsap/TextPlugin'
import { useRef } from 'react'

gsap.registerPlugin(useGSAP, TextPlugin)

export function useGsapAnim (params) {
  const container = useRef(null)

  return { container, gsap, useGSAP }
}
