import FloatText from '@/components/FloatText'

function HeroSection() {
  return (
    <div className='w-full h-fit flex justify-end mx-auto px-48'>
      <FloatText
        className='w-1/2 inline-block text-left text-fs-primay'
        animationOptions={{
          y: 30,
          duration: 1,
          delay: 1,
          opacity: 0,
          ease: 'power4.out',
        }}
        types='lines'
      >
        <div>
          Welcome to Infinity - your portal to playful living. We believe
          collectibles aren't just things — they're stories, memories, and
          sparks of joy. That's why we focus on curated, small-batch drops
          inspired by the fandoms we love. Made by fans, for fans. Limited
          releases, lasting impact.
        </div>
      </FloatText>
    </div>
  )
}

export default HeroSection
