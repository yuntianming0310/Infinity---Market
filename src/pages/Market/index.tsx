import gsap from 'gsap'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import { useFetchData } from '@/hooks/useFetchData'

import Wrapper from '@/components/Wrapper'
import FloatText from '@/components/FloatText'
import { Link, useNavigate } from 'react-router-dom'

type TProductItem = {
  id: string
  name: string
  price: number
  imageCover: string
  description: string
}

function Market() {
  return (
    <Wrapper>
      <HeroSection />
      <ProductList />
      <FooterAndConnect />
    </Wrapper>
  )
}

function HeroSection() {
  return (
    <div className='w-full h-fit flex justify-end mx-auto px-48'>
      <FloatText
        className='w-1/2 inline-block text-left overflow-hidden text-fs-primay'
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

function ProductList() {
  const { data, isLoading } = useFetchData<TProductItem[]>('/products', {
    params: {
      isFeatured: false,
    },
  })

  return (
    <div className='w-full grid grid-cols-2 px-48 py-32 gap-8'>
      {isLoading ? (
        <div className='flex items-center justify-center h-screen'>
          <div className='loader'></div>
        </div>
      ) : (
        data?.map(product => (
          <ProductItem
            id={product._id}
            imageCover={product.imageCover}
            description={product.description}
            name={product.name}
            price={product.price}
            key={product.name}
          />
        ))
      )}
    </div>
  )
}

function ProductItem({
  imageCover,
  description,
  name,
  price,
  id,
}: TProductItem) {
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useGSAP(
    () => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: containerRef }
  )

  function handleClick() {
    navigate('/product', {
      state: {
        id,
      },
    })
  }

  return (
    <div ref={containerRef} className='cursor-pointer' onClick={handleClick}>
      <div className='flex-1 h-[56rem] flex items-center justify-center bg-transparent'>
        <img
          src={imageCover}
          alt={description ?? 'A picture of the hot selling product'}
          className='max-w-[90%] max-h-[90%] object-contain'
        />
      </div>

      <FloatText
        className='flex flex-col items-center gap-2 mt-2'
        types='chars'
        animationOptions={{
          duration: 1,
          ease: 'power4.out',
        }}
      >
        <div className='overflow-hidden text-2xl tracking-widest'>{name}</div>
        <div className='overflow-hidden text-lg tracking-wider'>¥{price}</div>
      </FloatText>
    </div>
  )
}

function FooterAndConnect() {
  return (
    <div className='w-full flex justify-center px-48 pt-16 pb-48 bg-zinc-900 text-background-primary'>
      <ContactInfo />
      <div className='self-end text-center mr-auto'>
        <p>All For What We Love 🤞</p>
        <p className='text-2xl mt-4 text-zinc-500'>By Ken Wen</p>
      </div>
    </div>
  )
}

function ContactInfo({ direction = 'L' }: { direction?: 'L' | 'R' }) {
  const infoList = [
    {
      name: 'Github',
      href: '/',
    },
    {
      name: 'Medium',
      href: '/',
    },
    {
      name: 'G-Mail',
      href: '/',
    },
  ]

  return (
    <div className='self-end mr-auto'>
      <h2 className='text-2xl uppercase text-zinc-400'>Connect</h2>

      <ul
        className={`flex flex-col ${
          direction === 'L' ? 'items-start' : 'items-end'
        } text-2xl gap-1 mt-8`}
      >
        {infoList.map(({ href, name }) => (
          <li
            key={name}
            className='w-fit hover:text-primary-cyan transition-colors duration-300'
          >
            <Link to={href}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Market
