import React from 'react';
import { ServiceInquiryOption } from '../utils/waterCycleLogic';
import { ContactSection } from '../components/ContactSection';

interface ContactPageProps {
  selectedService: ServiceInquiryOption;
  suggestedProblemMessage: string;
  onServiceChange: (service: ServiceInquiryOption) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  selectedService,
  suggestedProblemMessage,
  onServiceChange,
}) => {
  return (
    <div>
      <ContactSection
        selectedService={selectedService}
        suggestedProblemMessage={suggestedProblemMessage}
        onServiceChange={onServiceChange}
      />
    </div>
  );
};

