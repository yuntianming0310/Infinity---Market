import Wrapper from '@/components/Wrapper'
import HeroSection from '@/pages/Market/components/HeroSection'
import ProductList from '@/pages/Market/components/ProductList'
import FooterAndConnect from '@/pages/Market/components/FooterAndConnect'

function Market() {
  return (
    <Wrapper>
      <HeroSection />
      <ProductList />
      <FooterAndConnect />
    </Wrapper>
  )
}

export default Market
