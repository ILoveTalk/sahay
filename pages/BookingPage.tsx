import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import LeafIcon from '../components/icons/LeafIcon';

type BookingStep = 'service' | 'time' | 'confirmation' | 'success';

const services = [
  "Academic Stress Counseling",
  "Anxiety Support Session",
  "General Check-in",
  "Relationship Advice",
  "Mindfulness Practice",
  "Goal Setting",
];

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

const ProgressBar: React.FC<{ currentStep: BookingStep }> = ({ currentStep }) => {
    const steps: BookingStep[] = ['service', 'time', 'confirmation'];
    const currentStepIndex = steps.indexOf(currentStep);

    return (
        <div className="flex justify-between items-center w-full max-w-2xl mx-auto mb-12">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div className="flex flex-col items-center">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                                index <= currentStepIndex ? 'bg-[#A3B18A] text-[#343A40]' : 'bg-gray-200 text-gray-500'
                            }`}
                        >
                           {currentStep === 'success' ? '✓' : index + 1}
                        </div>
                        <p className={`mt-2 text-sm capitalize font-['Poppins'] ${ index <= currentStepIndex ? 'text-[#343A40]' : 'text-gray-500'} hidden sm:block`}>{step}</p>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`flex-1 h-1 mx-2 sm:mx-4 transition-colors ${index < currentStepIndex || currentStep === 'success' ? 'bg-[#A3B18A]' : 'bg-gray-200'}`}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<BookingStep>('service');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleSelectService = (service: string) => {
    setSelectedService(service);
  };

  const handleNext = () => {
    if (step === 'service' && selectedService) setStep('time');
    if (step === 'time' && selectedDate && selectedTime) setStep('confirmation');
  };

  const handleBack = () => {
    if (step === 'time') setStep('service');
    if (step === 'confirmation') setStep('time');
  };
  
  const handleConfirm = () => {
    setStep('success');
  };


  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {step !== 'success' && (
            <>
                <h1 className="text-3xl sm:text-4xl font-['Poppins'] font-semibold text-center text-[#343A40] mb-12">Book a Confidential Session</h1>
                <ProgressBar currentStep={step} />
            </>
        )}

        {step === 'service' && (
            <div>
                <h2 className="text-2xl font-['Poppins'] font-semibold text-center text-[#343A40] mb-8">Step 1: Choose a Service</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map(service => (
                        <button
                            key={service}
                            onClick={() => handleSelectService(service)}
                            className={`p-6 rounded-lg text-left font-semibold border-2 transition-all duration-200 ${
                                selectedService === service
                                    ? 'bg-[#A3B18A] border-[#A3B18A] text-[#343A40] ring-2 ring-offset-2 ring-[#A3B18A]'
                                    : 'bg-white/50 border-gray-200 hover:border-[#A3B18A] hover:shadow-md'
                            }`}
                        >
                            {service}
                        </button>
                    ))}
                </div>
                {selectedService && (
                    <div className="text-center mt-12">
                        <Button onClick={handleNext}>Next</Button>
                    </div>
                )}
            </div>
        )}

        {step === 'time' && (
            <div>
                <h2 className="text-2xl font-['Poppins'] font-semibold text-center text-[#343A40] mb-8">Step 2: Select a Date & Time</h2>
                <input type="date" onChange={e => setSelectedDate(e.target.value)} className="block mx-auto mb-8 p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent"/>
                {selectedDate && (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md mx-auto">
                            {timeSlots.map(time => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={`p-3 rounded-lg border-2 transition-colors ${
                                        selectedTime === time
                                            ? 'bg-[#A3B18A] border-[#A3B18A] text-[#343A40]'
                                            : 'bg-white/50 border-gray-200 hover:border-[#A3B18A]'
                                    }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </>
                )}
                <div className="flex justify-center space-x-4 mt-12">
                    <Button onClick={handleBack} variant="secondary">Back</Button>
                    {selectedDate && selectedTime && <Button onClick={handleNext}>Next</Button>}
                </div>
            </div>
        )}

        {step === 'confirmation' && (
            <div className="text-center max-w-lg mx-auto bg-white/50 p-6 sm:p-8 rounded-lg shadow-sm">
                <LeafIcon className="w-16 h-16 text-[#A3B18A] mx-auto mb-4" />
                <h2 className="text-2xl sm:text-3xl font-['Poppins'] font-semibold text-[#343A40] mb-2">You're all set!</h2>
                 <p className="text-lg text-[#343A40] mb-6">Your confidential session is booked.</p>
                <div className="text-left space-y-3 text-base sm:text-lg bg-[#FEFAE0] p-4 sm:p-6 rounded-lg border border-gray-200">
                    <p><strong className="font-semibold text-gray-700 w-20 sm:w-24 inline-block">Service:</strong> {selectedService}</p>
                    <p><strong className="font-semibold text-gray-700 w-20 sm:w-24 inline-block">Date:</strong> {selectedDate}</p>
                    <p><strong className="font-semibold text-gray-700 w-20 sm:w-24 inline-block">Time:</strong> {selectedTime}</p>
                </div>
                <p className="text-sm text-gray-600 mt-8">
                    All bookings are confidential. Your information will only be shared with your assigned counselor. You will receive a confirmation email shortly.
                </p>
                <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-4 sm:space-y-0 mt-8">
                    <Button onClick={handleBack} variant="secondary">Back</Button>
                    <Button onClick={handleConfirm}>Confirm Booking</Button>
                </div>
            </div>
        )}

        {step === 'success' && (
            <div className="text-center max-w-lg mx-auto bg-white/50 p-6 sm:p-8 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-[#A3B18A] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-['Poppins'] font-semibold text-[#343A40] mb-2">Booking Confirmed!</h2>
                <p className="text-lg text-[#343A40] mb-6">
                    A confirmation has been sent to your student email.
                </p>
                <div className="text-left space-y-3 text-base bg-[#FEFAE0] p-4 rounded-lg border border-gray-200 mb-8">
                    <p><strong className="font-semibold text-gray-700 w-20 inline-block">Service:</strong> {selectedService}</p>
                    <p><strong className="font-semibold text-gray-700 w-20 inline-block">Date:</strong> {selectedDate}</p>
                    <p><strong className="font-semibold text-gray-700 w-20 inline-block">Time:</strong> {selectedTime}</p>
                </div>
                <Button onClick={() => navigate('/')}>Go to Home</Button>
            </div>
        )}
    </div>
  );
};

export default BookingPage;