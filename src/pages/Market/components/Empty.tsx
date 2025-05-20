function Empty() {
  return (
    <div className='col-span-2 flex flex-col items-center justify-center py-32 gap-6'>
      <div className='text-6xl font-light text-black/40'>✧</div>
      <h3 className='text-4xl font-light tracking-wide text-black/60'>
        No Products Found
      </h3>
      <p className='text-xl font-light text-black/40 mt-4'>
        Try adjusting your search or filter to find what you're looking for
      </p>
    </div>
  )
}

export default Empty
