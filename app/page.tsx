import Navbar from '@/components/Navbar'
import Image from 'next/image'
import React from 'react'
import { FaDotCircle } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowRightIcon, CircleCheck, Laptop, MessageSquareQuote, PenTool, Rocket, Send, Sparkles, User } from 'lucide-react'
import { RiOrganizationChart } from 'react-icons/ri'
import Link from 'next/link'
import Footer from '@/components/Footer'
import AutoScrollButton from '@/components/AutoScrollButton'
import { AuroraText } from '@/components/magicui/aurora-text'

const page = () => {
  return (
    <div>
        <Navbar/>
        <div className='flex flex-col md:flex-row p-7 lg:p-20 items-center lg:justify-around bg-[#f1f5fe] dark:bg-transparent'>

          <div className='flex flex-col items-center justify-center md:items-baseline md:justify-start lg:w-2xl'>
            <div className="inline-flex items-center space-x-2 bg-[#4063ff]/20 px-4 py-2 rounded-full border border-[#4063ff]/30 mb-3">
              <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Real-time Feedback</span>
            </div>
            <p className='font-bold text-5xl text-center md:text-left lg:text-8xl'>Get honest feedback <AuroraText
              colors={[
              'var(--chart-5)',
              'var(--chart-4)',
              'var(--chart-3)',
              'var(--chart-2)',
              'var(--chart-1)',
            ]}
            speed={2}
          >
            Anonymously.
          </AuroraText>
          </p>
            <p className='md:text-left text-center mt-6 text-wrap text-sm md:w-90 md:text-xl lg:w-2xl'>Opinion helps teams, creators, and individuals gather real feedback without fear or filters.</p>
            
              <div className='flex gap-2 mt-5 items-center justify-center'>
                <Link href='/sign-up'>
                <Button className='p-5 text-white lg:w-72' effect="expandIcon" icon={ArrowRightIcon} iconPlacement="right">
                Start for free
              </Button>
                </Link>
            <AutoScrollButton sectionId='how-it-works'/>
            </div>

          </div>


        <div className='bg-[#c8dcfd] dark:bg-[#1e293b] mt-7 lg:mt-0 p-5 w-full lg:w-1/3 lg:box-content py-8 lg:py-10 rounded-lg border dark:border-slate-600'>
          <div className='flex flex-col'>
                <div className='flex items-center gap-4'>
                  <Image src={'https://res.cloudinary.com/ddfs2kbi3/image/upload/v1751611597/userimg_ttu56f.jpg'} height={100} width={100} alt='User image' className='rounded-full' />
                  <div className='flex flex-col'>
                    <p className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Alex Carter</p>
                    <p className='text-sm text-gray-500 dark:text-gray-300 italic'>"What did you think of my presentation?"</p>
                  </div>
                </div>

                  <div className='mt-7 flex flex-col gap-3 font-medium text-sm lg:text-[16px]'>
                    <div className='bg-white dark:bg-slate-900 flex items-center text-black dark:text-white p-4 rounded-lg gap-2'>
                      <FaDotCircle className='text-green-600' />
                      <p>Good Job on the presentation!</p>
                    </div>
                    <div className='bg-white dark:bg-slate-900 flex items-center text-black dark:text-white p-4 rounded-lg text-wrap gap-2'>
                      <FaDotCircle className='text-blue-600'/>
                      <p>You could improve communication</p>
                    </div>
                    <div className='bg-white dark:bg-slate-900 flex items-center text-black dark:text-white p-4 rounded-lg gap-2'>
                      <FaDotCircle className='text-blue-400'/>
                      <p>Consider refining the design</p>
                    </div>
                  </div>
            </div>
          </div>
        </div>


<div className='mt-20 px-6'>
  <div className='flex flex-col items-center justify-center max-w-7xl mx-auto'>
    <p id='how-it-works' className='font-bold text-4xl md:text-5xl text-center text-gray-900 dark:text-white mb-12'>How it Works</p>
    
    <div  className='grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 w-full'>
      <div className='md:col-span-2 md:row-span-2 bg-[#f1f5fe] dark:bg-[#1e293b] p-8 rounded-3xl border dark:border-slate-600 relative overflow-hidden group hover:shadow-2xl transition-all duration-300'>
        <div className='relative z-10'>
          <div className='bg-[#5D2DE6] dark:bg-[#4063ff] p-4 rounded-2xl w-fit mb-6'>
            <Laptop className='size-8 text-white' />
          </div>
          <h3 className='font-bold text-2xl text-gray-900 dark:text-white mb-4'>Create Your Link</h3>
          <p className='text-gray-600 dark:text-gray-300 text-lg leading-relaxed'>Set up your personalized feedback link in seconds. Customize your questions and make it yours.</p>
          <div className='mt-8 space-y-3'>
            <div className='flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400'>
              <div className='w-2 h-2 bg-[#5D2DE6] dark:bg-[#4063ff] rounded-full'></div>
              <span>Custom questions</span>
            </div>
            <div className='flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400'>
              <div className='w-2 h-2 bg-[#5D2DE6] dark:bg-[#4063ff] rounded-full'></div>
              <span>Branded experience</span>
            </div>
            <div className='flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400'>
              <div className='w-2 h-2 bg-[#5D2DE6] dark:bg-[#4063ff] rounded-full'></div>
              <span>Privacy controls</span>
            </div>
          </div>
        </div>
      </div>

      <div className='md:col-span-2 bg-[#f1f5fe] dark:bg-[#1e293b] p-6 rounded-3xl border dark:border-slate-600 group hover:shadow-lg transition-all duration-300'>
        <div className='bg-[#5D2DE6] dark:bg-[#4063ff] p-3 rounded-xl w-fit mb-4'>
          <Send className='size-6 text-white' />
        </div>
        <h3 className='font-bold text-xl text-gray-900 dark:text-white mb-2'>Share it Anywhere</h3>
        <p className='text-gray-600 dark:text-gray-300'>Social media, email, QR codes - share however you want.</p>
      </div>

      <div className='bg-[#f1f5fe] dark:bg-[#1e293b] p-6 rounded-3xl border dark:border-slate-600 group hover:shadow-lg transition-all duration-300'>
        <div className='bg-[#5D2DE6] dark:bg-[#4063ff] p-3 rounded-xl w-fit mb-4'>
          <MessageSquareQuote className='size-6 text-white' />
        </div>
        <h3 className='font-bold text-xl text-gray-900 dark:text-white mb-2'>Get Feedback</h3>
        <p className='text-gray-600 dark:text-gray-300'>Receive honest, anonymous feedback from your audience.</p>
      </div>

      <div className='bg-[#f1f5fe] dark:bg-[#1e293b] p-6 rounded-3xl border dark:border-slate-600 group hover:shadow-lg transition-all duration-300'>
        <div className='bg-[#5D2DE6] dark:bg-[#4063ff] p-3 rounded-xl w-fit mb-4'>
          <PenTool className='size-6 text-white' />
        </div>
        <h3 className='font-bold text-xl text-gray-900 dark:text-white mb-2'>Review & Improve</h3>
        <p className='text-gray-600 dark:text-gray-300'>Analyze insights and take action on valuable feedback.</p>
      </div>
    </div>
  </div>
</div>

<div className='mt-32 px-6'>
  <div className='flex flex-col items-center justify-center max-w-7xl mx-auto'>
    <p className='font-bold text-4xl md:text-5xl text-center text-gray-900 dark:text-white mb-12'>Use Cases</p>
    
    <div className='grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 w-full mb-6'>
      <div className='md:col-span-2 md:row-span-2 bg-[#f1f5fe] dark:bg-[#1e293b] p-8 rounded-3xl border dark:border-slate-600 relative overflow-hidden group hover:shadow-2xl transition-all duration-300'>
        <div className='relative z-10'>
          <div className='bg-[#5D2DE6] dark:bg-[#4063ff] p-4 rounded-2xl w-fit mb-6'>
            <CircleCheck className='size-8 text-white' />
          </div>
          <h3 className='font-bold text-2xl text-gray-900 dark:text-white mb-4'>For Creators</h3>
          <p className='text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6'>Get honest opinions on your content from your audience without the fear of public judgment.</p>
          <div className='space-y-3'>
            <div className='flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400'>
              <div className='w-2 h-2 bg-[#5D2DE6] dark:bg-[#4063ff] rounded-full'></div>
              <span>Content feedback</span>
            </div>
            <div className='flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400'>
              <div className='w-2 h-2 bg-[#5D2DE6] dark:bg-[#4063ff] rounded-full'></div>
              <span>Audience insights</span>
            </div>
            <div className='flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400'>
              <div className='w-2 h-2 bg-[#5D2DE6] dark:bg-[#4063ff] rounded-full'></div>
              <span>Growth opportunities</span>
            </div>
          </div>
        </div>
      </div>

      <div className='md:col-span-2 bg-[#f1f5fe] dark:bg-[#1e293b] p-6 rounded-3xl border dark:border-slate-600 group hover:shadow-lg transition-all duration-300'>
        <div className='bg-[#5D2DE6] dark:bg-[#4063ff] p-3 rounded-xl w-fit mb-4'>
          <RiOrganizationChart className='size-6 text-white' />
        </div>
        <h3 className='font-bold text-xl text-gray-900 dark:text-white mb-2'>For Teams</h3>
        <p className='text-gray-600 dark:text-gray-300'>Collect feedback to improve collaboration and team dynamics.</p>
      </div>

      <div className='bg-[#f1f5fe] dark:bg-[#1e293b] p-6 rounded-3xl border dark:border-slate-600 group hover:shadow-lg transition-all duration-300'>
        <div className='bg-[#5D2DE6] dark:bg-[#4063ff] p-3 rounded-xl w-fit mb-4'>
          <User className='size-6 text-white' />
        </div>
        <h3 className='font-bold text-xl text-gray-900 dark:text-white mb-2'>For Individuals</h3>
        <p className='text-gray-600 dark:text-gray-300'>Understand how others perceive you.</p>
      </div>

      <div className='bg-[#f1f5fe] dark:bg-[#1e293b] p-6 rounded-3xl border dark:border-slate-600 group hover:shadow-lg transition-all duration-300'>
        <div className='bg-[#5D2DE6] dark:bg-[#4063ff] p-3 rounded-xl w-fit mb-4'>
          <Rocket className='size-6 text-white' />
        </div>
        <h3 className='font-bold text-xl text-gray-900 dark:text-white mb-2'>For Startups</h3>
        <p className='text-gray-600 dark:text-gray-300'>Gather early insights on product ideas and validate concepts.</p>
      </div>
    </div>
  </div>



   <div className='my-8 lg:h-44 bg-[#5D2DE6] dark:bg-[#4063ff] p-7 rounded-2xl lg:flex lg:items-center lg:justify-center'>
        <div className='flex flex-col lg:flex-row items-center gap-5 justify-center'>
          <p className='font-bold text-white text-2xl md:text-4xl lg:text-5xl'>Ready to hear the truth?</p>
          <Link href={'/sign-up'}>
          <Button className='bg-white text-black hover:bg-white lg:py-7'>Get Anonymous Feedback<ArrowRight/></Button>
          </Link>
        </div>

      </div>
  </div>

     <Footer/>

    </div>
  )
}

export default page