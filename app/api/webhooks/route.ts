import { dbConnect } from '@/app/db/dbConnect';
import User from '@/app/db/models/user.model';
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    if (evt.type === 'user.created') {
    console.log('userId:', evt.data.id)
    const { id, email_addresses, first_name, username } = evt.data;
    try{
      await dbConnect();
      await User.create({
          clerkId: id,
          username: username,
          email: email_addresses[0].email_address,
          firstname: first_name,
      })
      console.log('user created');
    }catch(err){
      console.log(err);
    }
    }

    if (evt.type === 'user.updated') {
      const { id, email_addresses, first_name, username } = evt.data;
      try {
        await dbConnect();
        await User.findOneAndUpdate({clerkId: id},{
          email: email_addresses[0].email_address,
          firstname: first_name,
          username: username,
        })
        console.log('user updated')  
      } catch (error) {
        console.log(error);
      }
    }

    if (evt.type === 'user.deleted'){
      const { id } = evt.data;
      try{
        await dbConnect();
        await User.findOneAndDelete({clerkId: id});
        console.log('user deleted');
      }catch(error){
        console.log(error);
      }
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}