import Wrapper from '@/components/Wrapper'
import Logo from '@/components/Logo'
import HeroSection from '@/pages/Market/components/HeroSection'
import ProductList from '@/pages/Market/components/ProductList'
import FooterAndConnect from '@/pages/Market/components/FooterAndConnect'

function Market() {
  return (
    <Wrapper enableNav={false} className='mt-32'>
      <MarketNav />
      <HeroSection />
      <ProductList />
      <FooterAndConnect />
    </Wrapper>
  )
}

function MarketNav() {
  return (
    <nav className='text-white font-Cinzel flex items-center max-w-full fixed top-0 left-0 right-0 z-50 px-24 py-8 mix-blend-difference'>
      <Logo />
    </nav>
  )
}

export default Market
