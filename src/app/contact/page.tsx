'use client';

import ContactComponent from '@/components/ContactComponent';
import PageBackground from '@/components/ui/PageBackground';

export default function ContactPage() {
  return (
    <PageBackground variant="home">
      <div className="grid-container py-12">
        <div className="text-center mb-8">
          <h1 className="heading-1 text-gradient-modern text-center mb-4">
            <span className="bg-gradient-to-r from-accent via-secondary-learn to-secondary-secure bg-clip-text text-transparent">
              خدمة العملاء والاتصال
            </span>
          </h1>
          <p className="body-text text-text-secondary content-normal mx-auto">
            نحن هنا لمساعدتك في كل خطوة من رحلتك التعليمية
          </p>
        </div>
        <ContactComponent />
      </div>
    </PageBackground>
  );
}
