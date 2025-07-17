import React from 'react'
import Image from 'next/image'
import { GetSpaceFeedback } from '../actions/actions'
import { notFound } from 'next/navigation'
import { FeedbackForm } from '@/components/FeedbackForm'
import ReactMarkdown from 'react-markdown'

interface PageProps {
  params: Promise<{
    spacename: string
  }>
}

const page = async({ params }: PageProps) => {
      const { spacename } = await params;
    
      const Data = await GetSpaceFeedback(spacename);

      if(!Data.success){
        return notFound();
      }
      const space = Data.space;
      const Color: string = space?.color || 'var(--primary)';

  return (
    <div className="min-h-screen mt-10">      
        {/* Main Content */}
        <div className='flex items-center justify-center py-8 px-4'>
            <div className='w-fit rounded-xl border shadow-lg'>
                {/* Space Header */}
                <div className='flex items-center justify-center flex-col gap-3 pt-8 pb-6 px-6'>
                    <Image 
                        src={space?.SpaceLogo || ''} 
                        height={80} 
                        width={80} 
                        alt='' 
                        className={`${space?.rounded ? 'rounded-full' : 'rounded-lg'} border-4 shadow-lg`}
                        style={{ borderColor: Color }}
                    />
                    <p className='lg:text-6xl text-4xl font-bold mt-5 mb-2 text-center'>{space?.title}</p>
                    <div className="prose dark:prose-invert prose-neutral prose-h1:text-2xl md:prose-h1:text-4xl">
                    <ReactMarkdown>
                        {space?.message}
                    </ReactMarkdown>
                    </div>
                </div>
                
                {/* Questions Section */}
                <div className='px-6 pb-8'>
                    {space?.questions.length === 0 ? '': 
                    <div>
                    <div className='flex flex-col gap-2 mb-6'>
                        <p className='text-2xl font-bold'>Questions</p>
                        <p className={`w-16 h-1 rounded-full`} style={{ backgroundColor: Color }}></p>
                    </div>
                    </div>}
                   

                    <div className='space-y-4 mb-8'>
                        {space?.questions.map((question, index) => (
                            <div key={index}>
                                <div className='flex items-start gap-3'>
                                    <div 
                                        className='w-2 h-2 rounded-full mt-2 flex-shrink-0'
                                        style={{ backgroundColor: Color}}
                                    ></div>
                                    <p className='text-md font-semibold text-gray-800 dark:text-gray-200'>{question}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className='flex items-center justify-center'>
                        <FeedbackForm color={Color} spacename={spacename} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page