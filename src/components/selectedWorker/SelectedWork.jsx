import React from 'react'
import MainHeader from './MainHeader'
import Card from './Card'
import './select.css'

import oneImg from '../../assets/SelectedWork/one.svg'
import twoImg from '../../assets/SelectedWork/two.svg'
import threeImg from '../../assets/SelectedWork/three.svg'
import fourImg from '../../assets/SelectedWork/four.svg'

const cardsData = [
  {
    tag: "Exotel - 2025",
    title: "Helping Contact Center Agents Resolve and Support Faster",
    description: "Transforming a legacy contact center interface into an AI powered efficient and future ready workspace for millions of customers",
    image: oneImg,
    actions: [
      { type: 'button', text: 'Read Case Study', variant: 'primary', href: 'https://www.behance.net/gallery/244967223/Enterprise-Agent-Workspace-Redesign' }
    ]
  },
  {
    tag: "Exotel - 2026",
    title: "Turning Business Goals to Journeys: Designing an AI first Orchestrator",
    description: "Designing an AI First Experience for an Enterprise Journey Orchestrator - from a simple prompt to live self optimising journey",
    image: twoImg,
    isComingSoon: true,
    actions: [
      { type: 'text', text: 'Case Study Coming Soon', variant: 'muted' }
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
