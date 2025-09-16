
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ChatBubbleIcon from '../components/icons/ChatBubbleIcon';
import CalendarIcon from '../components/icons/CalendarIcon';
import BookIcon from '../components/icons/BookIcon';
import UsersIcon from '../components/icons/UsersIcon';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white/50 p-6 rounded-lg shadow-sm text-center flex flex-col">
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-['Poppins'] font-semibold text-[#343A40] mb-2">{title}</h3>
    <p className="text-[#343A40] leading-relaxed flex-grow">{children}</p>
  </div>
);

const SolutionStep: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white/30 p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-['Poppins'] font-semibold text-[#343A40] mb-2">{title}</h3>
        <p className="text-[#343A40]">{children}</p>
    </div>
);


const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="text-center py-16 sm:py-20 md:py-32">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-['Poppins'] font-semibold text-[#343A40] tracking-tight">Support. Starts. Here.</h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-[#343A40] font-['Lato'] leading-8">
            A private, safe space for students to feel better.
          </p>
          <div className="mt-10">
            <Button className="text-lg sm:text-xl !px-10 sm:!px-12 !py-3 sm:!py-4" onClick={() => navigate('/chat')}>
              Chat with Sahay AI
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/30">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<ChatBubbleIcon className="w-12 h-12 text-[#A3B18A]" />} title="AI First-Aid Chat">
              Get private support right away. Our AI is a safe first step to talk about what's on your mind.
            </FeatureCard>
            <FeatureCard icon={<CalendarIcon className="w-12 h-12 text-[#A3B18A]" />} title="Private Booking">
              Easily book a meeting with a school counselor. It's safe and private.
            </FeatureCard>
             <FeatureCard icon={<UsersIcon className="w-12 h-12 text-[#A3B18A]" />} title="Student Support Forum">
              Connect with other students in a safe forum. Share your story and find strength together.
            </FeatureCard>
            <FeatureCard icon={<BookIcon className="w-12 h-12 text-[#A3B18A]" />} title="Helpful Resources">
              Find articles, videos, and audio guides to help you learn and feel better at your own pace.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-semibold text-[#343A40]">How Sahay Helps Students</h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-[#343A40]">
                    Sahay is a support system for schools. We offer a safe, private, and easy-to-use platform to help students with their mental health.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
                <SolutionStep title="A Safe Place to Start">
                    Talking about feelings can be hard. Our private AI chat and student forums are safe spaces to share what's on your mind.
                </SolutionStep>
                <SolutionStep title="Support Anytime, Anywhere">
                    Sahay is always here for you, on your phone or computer. Get help whenever you need it.
                </SolutionStep>
                <SolutionStep title="Learn Healthy Habits Early">
                    We give you tools to understand your feelings and build good mental health habits for the future.
                </SolutionStep>
                <SolutionStep title="Working with Your School">
                    We partner with schools to provide the best support, with helpful information to guide their wellness plans.
                </SolutionStep>
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
