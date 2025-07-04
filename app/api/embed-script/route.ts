// app/api/embed-script/route.ts

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const spacename = searchParams.get('space');

  const script = `
    class FeedbackWidget extends HTMLElement {
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const iframe = document.createElement('iframe');
        iframe.src = "https://yourdomain.com/embed/${spacename}";
        iframe.style.border = "none";
        iframe.style.width = "100%";
        iframe.style.height = "500px";

        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.width = '100%';
        wrapper.style.maxWidth = '500px';
        wrapper.style.boxShadow = '0 0 12px rgba(0,0,0,0.15)';
        wrapper.appendChild(iframe);

        shadow.appendChild(wrapper);
      }
    }

    customElements.define('feedback-widget', FeedbackWidget);
  `;

  return new NextResponse(script, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
