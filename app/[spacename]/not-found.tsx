import Image from 'next/image'
import Link from 'next/link'
import LogoPng from '@/public/Opnion.png'

 
export default function NotFound() {
  return (
  
    <div className='flex items-center justify-center mt-52 flex-col gap-3'>
      <h2 className='text-9xl md:text-[9rem] lg:text-[11rem] font-bold'>404</h2>
      <p className='text-3xl font-bold'>Space not found</p>
       <Link href={'/'} className='flex items-center grayscale text-gray-500 text-md gap-0.5 hover:grayscale-0 transition-all duration-300 hover:dark:text-white hover:text-primary'>
                <Image src={LogoPng} height={25} width={25} alt=''/>
                  <p className='font-bold'>pinion</p>
              </Link>
    </div>

    
  )
}