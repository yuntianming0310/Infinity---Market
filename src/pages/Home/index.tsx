import Nav from '@/components/Nav'
import Wrapper from '@/components/Wrapper'

import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import HotProductSection from './components/HotProductSection'
import IntroSection from './components/IntroSection'

function Home() {
  return (
    <Wrapper>
      <HeroSection />
      <HotProductSection />
      <IntroSection />
      <Footer />
    </Wrapper>
  )
}

export default Home
