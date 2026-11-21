import React from 'react'
import MainHeader from './MainHeader'
import Card from './Card'
import './select.css'

import dexThumbnail from '../../assets/dex/thumbnail.webp'
import oneImg from '../../assets/SelectedWork/one.svg'
import threeImg from '../../assets/SelectedWork/three.svg'
import fourImg from '../../assets/SelectedWork/four.svg'

const cardsData = [
  {
    tag: "Exotel - 2026",
    title: "Dex copilot: 62% fewer tickets. New IVRs live in 1 day",
    description: "An AI copilot in Synthesizer that reads a statement of work and builds a tested IVR flow while the admin watches.",
    image: dexThumbnail,
    actions: [
      { type: 'button', text: 'Read Case Study', variant: 'primary', href: '/case-study/dex', isInternalLink: true }
    ]
  },
  {
    tag: "Exotel - 2025",
    title: "Helping Contact Center Agents Resolve and Support Faster",
    description: "Transforming a legacy contact center interface into an AI powered efficient and future ready workspace for millions of customers",
    image: oneImg,
    actions: [
      { type: 'button', text: 'Read Case Study', variant: 'primary', href: '/case-study/agent-workspace', isInternalLink: true }
    ]
  },
  {
    tag: "Government of India, NeGD - 2024",
    title: "UX4G Design System: Transforming Government UX Standards",
    description: "Crafting a unified design language to empower consistency, accessibility, and innovation across India's digital governance landscape.",
    image: threeImg,
    actions: [
      { type: 'button', text: 'Read Case Study', variant: 'primary', href: 'https://www.behance.net/gallery/212610759/UX4G-Design-System-Shaping-Indian-Gov' },
      { type: 'button', text: 'UX4G Design System 2.0', variant: 'outline', href: 'https://www.figma.com/community/file/1471833723727926454', hasDot: true }
    ]
  },
  {
    tag: "Government of India, NeGD - 2024",
    title: "Redesigning UMANG - Integrated Services, Higher Adoption, Smarter Discovery",
    description: "Transforming UMANG into a scalable super-app by integrating key government services and improving service discovery through personalization.",
    image: fourImg,
    actions: [
      { type: 'button', text: 'See UI Showcase (NDA Compliant)', variant: 'primary', href: '/case-study/umang', isInternalLink: true }
    ]
  }
];

const SelectedWork = () => {
  return (
    <div id="my-experiences" className='class-container'>
      <MainHeader />
      <div className='cards-grid'>
        {cardsData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  )
}

export default SelectedWork
