
import React, { useState } from 'react';
import QuestionIcon from '../components/icons/QuestionIcon';
import LeafIcon from '../components/icons/LeafIcon';
import UsersIcon from '../components/icons/UsersIcon';
import ChatBubbleIcon from '../components/icons/ChatBubbleIcon';

const faqData = [
    {
        question: "Is this service private?",
        answer: "Yes. Your privacy is very important to us. All conversations with the AI and counselors are private and secure. We will never share your personal information."
    },
     {
        question: "Does Sahay work with my school?",
        answer: "Sahay is built to partner with schools. Our platform connects with your school's own counselors and support services, making it a helpful part of student life."
    },
    {
        question: "Is the AI chat a real therapist?",
        answer: "No. The AI chat is a first-aid tool for listening. It's here to help you 24/7. It can offer helpful tips and guide you to a professional counselor if you need more support."
    },
    {
        question: "Who are the student mentors?",
        answer: "Mentors are student volunteers who are trained to listen and provide support. They help keep the forums safe and positive. They share experiences, but they do not give medical advice."
    }
];

const EcosystemCard: React.FC<{ icon: React.ReactNode; title: string; children: string }> = ({ icon, title, children }) => (
    <div className="bg-white/50 p-6 rounded-lg shadow-sm text-center">
        <div className="flex justify-center mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-['Poppins'] font-semibold text-[#343A40] mb-2">{title}</h3>
        <p className="text-[#343A40] leading-relaxed">{children}</p>
    </div>
);

const FaqItem: React.FC<{ q: string; a: string; }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-4"
            >
                <span className="text-lg font-semibold text-[#343A40] pr-4">{q}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} flex-shrink-0`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <p className="pb-4 text-[#343A40] leading-relaxed pr-6">{a}</p>
            </div>
        </div>
    );
}

const AboutPage: React.FC = () => {
    return (
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
            {/* Mission Section */}
            <section className="text-center mb-16 sm:mb-20">
                <h1 className="text-4xl md:text-5xl font-['Poppins'] font-semibold text-[#343A40]">Our Goal</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg sm:text-xl text-[#343A40] leading-8">
                    Our goal is simple: to give every student a safe and private digital space to support their mental health. We believe asking for help is a sign of strength.
                </p>
            </section>

            {/* Ecosystem Section */}
            <section className="mb-16 sm:mb-20">
                <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-semibold text-center text-[#343A40] mb-12">How We Support You</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <EcosystemCard 
                        icon={<ChatBubbleIcon className="w-12 h-12 text-[#A3B18A]" />}
                        title="AI First-Aid"
                    >
                        A private, 24/7 chat service that offers support and helpful tips right when you need it.
                    </EcosystemCard>
                     <EcosystemCard 
                        icon={<LeafIcon className="w-12 h-12 text-[#A3B18A]" />}
                        title="School Counselors"
                    >
                        A private booking system to connect you with professional counselors at your school.
                    </EcosystemCard>
                    <EcosystemCard 
                        icon={<UsersIcon className="w-12 h-12 text-[#A3B18A]" />}
                        title="Student Mentors"
                    >
                        Trained student volunteers who help keep our community forums safe and supportive.
                    </EcosystemCard>
                </div>
            </section>

            {/* FAQ Section */}
            <section>
                <div className="flex justify-center items-center gap-4 mb-12">
                     <QuestionIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#343A40]" />
                     <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-semibold text-center text-[#343A40]">Common Questions</h2>
                </div>
                <div className="max-w-3xl mx-auto">
                    {faqData.map(item => <FaqItem key={item.question} q={item.question} a={item.answer} />)}
                </div>
            </section>
        </div>
    );
};

export default AboutPage;