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

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full flex flex-col items-start justify-center py-32'>
      {children}
    </div>
  )
}

export default Home
