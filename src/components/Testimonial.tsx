'use client'

import React, { useState, useEffect } from 'react';

interface TestimonialData {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly avatar: string;
  readonly content: string;
  readonly rating: number;
  readonly pullUpsBefore: number;
  readonly pullUpsAfter: number;
  readonly timeframe: string;
}

const testimonials: readonly TestimonialData[] = [
  {
    id: '1',
    name: 'Marcus Chen',
    role: 'Software Engineer',
    avatar: '/avatars/marcus.jpg',
    content: 'PullForce transformed my training completely. The AI form analysis caught mistakes I never knew I was making. Went from struggling with 3 pull-ups to crushing 15 clean reps.',
    rating: 5,
    pullUpsBefore: 3,
    pullUpsAfter: 15,
    timeframe: '3 months'
  },
  {
    id: '2',
    name: 'Sarah Rodriguez',
    role: 'CrossFit Athlete',
    avatar: '/avatars/sarah.jpg',
    content: 'The real-time feedback is incredible. It\'s like having a personal trainer 24/7. My form has never been better, and the progress tracking keeps me motivated every single day.',
    rating: 5,
    pullUpsBefore: 8,
    pullUpsAfter: 25,
    timeframe: '4 months'
  },
  {
    id: '3',
    name: 'David Kim',
    role: 'Marine Veteran',
    avatar: '/avatars/david.jpg',
    content: 'As someone who thought they knew pull-ups, PullForce humbled me. The AI coaching revealed inefficiencies in my technique that were holding me back for years.',
    rating: 5,
    pullUpsBefore: 12,
    pullUpsAfter: 30,
    timeframe: '6 months'
  },
  {
    id: '4',
    name: 'Emily Watson',
    role: 'Personal Trainer',
    avatar: '/avatars/emily.jpg',
    content: 'I recommend PullForce to all my clients now. The biomechanical analysis is spot-on, and the progression tracking helps me design better programs. Game changer for the fitness industry.',
    rating: 5,
    pullUpsBefore: 6,
    pullUpsAfter: 22,
    timeframe: '5 months'
  },
  {
    id: '5',
    name: 'Alex Thompson',
    role: 'College Student',
    avatar: '/avatars/alex.jpg',
    content: 'Started from zero pull-ups and felt embarrassed at the gym. PullForce gave me the confidence to train properly. Now I\'m helping my friends with their form!',
    rating: 5,
    pullUpsBefore: 0,
    pullUpsAfter: 12,
    timeframe: '4 months'
  },
  {
    id: '6',
    name: 'Jessica Park',
    role: 'Physical Therapist',
    avatar: '/avatars/jessica.jpg',
    content: 'The injury prevention features are outstanding. As a PT, I appreciate how the app prioritizes proper movement patterns over just rep counts. Brilliant engineering.',
    rating: 5,
    pullUpsBefore: 4,
    pullUpsAfter: 18,
    timeframe: '3 months'
  },
  {
    id: '7',
    name: 'Ryan Mitchell',
    role: 'Fire Fighter',
    avatar: '/avatars/ryan.jpg',
    content: 'Physical fitness is crucial in my job. PullForce helped me exceed department standards and gave me the edge I needed for promotions. The accountability features are perfect.',
    rating: 5,
    pullUpsBefore: 10,
    pullUpsAfter: 35,
    timeframe: '6 months'
  },
  {
    id: '8',
    name: 'Lisa Chang',
    role: 'Yoga Instructor',
    avatar: '/avatars/lisa.jpg',
    content: 'I was skeptical about AI coaching, but the form corrections were incredibly accurate. It helped me build the upper body strength I was missing in my practice.',
    rating: 5,
    pullUpsBefore: 2,
    pullUpsAfter: 14,
    timeframe: '5 months'
  },
  {
    id: '9',
    name: 'Michael Torres',
    role: 'Rock Climber',
    avatar: '/avatars/michael.jpg',
    content: 'The grip strength analysis and finger positioning feedback translated directly to my climbing performance. My project routes feel so much more manageable now.',
    rating: 5,
    pullUpsBefore: 15,
    pullUpsAfter: 40,
    timeframe: '4 months'
  }
] as const;

interface TestimonialCardProps {
  readonly testimonial: TestimonialData;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps): JSX.Element => {
  const { name, role, content, rating, pullUpsBefore, pullUpsAfter, timeframe } = testimonial;

  return (
    <div className="bg-neutral-900 border border-gray-800 p-8 hover:border-[#00FFD1]/30 transition-all duration-300 h-full flex flex-col">
      {/* Rating */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: rating }, (_, i) => (
          <div key={i} className="w-4 h-4 bg-[#00FFD1] rounded-full" />
        ))}
      </div>

      {/* Content */}
      <blockquote className="text-gray-300 text-lg leading-relaxed mb-8 flex-grow">
        "{content}"
      </blockquote>

      {/* Progress stats */}
      <div className="flex items-center justify-between mb-6 p-4 bg-neutral-950 border border-gray-800">
        <div className="text-center">
          <div className="text-gray-400 text-xs font-mono tracking-wider mb-1">BEFORE</div>
          <div className="text-white text-2xl font-bold">{pullUpsBefore}</div>
        </div>
        <div className="flex-1 mx-4 relative">
          <div className="h-px bg-gray-700"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-[#00FFD1] px-2 py-1 text-xs font-mono text-black">
              {timeframe}
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-gray-400 text-xs font-mono tracking-wider mb-1">AFTER</div>
          <div className="text-[#00FFD1] text-2xl font-bold">{pullUpsAfter}</div>
        </div>
      </div>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[#00FFD1]/20 to-[#00FFD1]/5 border border-[#00FFD1]/30 flex items-center justify-center">
          <span className="text-[#00FFD1] font-bold text-lg">
            {name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <div className="text-white font-semibold">{name}</div>
          <div className="text-gray-400 text-sm">{role}</div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  // Update cards to show based on screen size
  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const maxIndex = testimonials.length - cardsToShow;
    const timer = setInterval(() => {
      setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, [cardsToShow]);

  const nextSlide = () => {
    const maxIndex = testimonials.length - cardsToShow;
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  };

  const prevSlide = () => {
    const maxIndex = testimonials.length - cardsToShow;
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const maxIndex = testimonials.length - cardsToShow;
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + cardsToShow);

  return (
    <section className="bg-neutral-950 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-8">
            <span className="px-4 py-2 text-xs font-mono tracking-wider text-[#1AFFD6] border border-[#00FFD1]/30 bg-[#00FFD1]/5">
              SUCCESS STORIES
            </span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-black tracking-tight leading-none mb-8">
            <span className="text-white block">REAL</span>
            <span className="text-[#00FFD1] block">RESULTS</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Join thousands of athletes who've transformed their pull-up performance
            with AI-powered coaching and real-time form analysis.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mb-12">
          {/* Cards container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-8"
              style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0"
                  style={{ width: `calc(${100 / cardsToShow}% - ${(cardsToShow - 1) * 2}rem / ${cardsToShow})` }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-neutral-900 border border-gray-700 hover:border-[#00FFD1]/50 p-3 transition-all duration-200"
            aria-label="Previous testimonials"
          >
            <svg className="w-5 h-5 text-gray-400 hover:text-[#00FFD1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-neutral-900 border border-gray-700 hover:border-[#00FFD1]/50 p-3 transition-all duration-200"
            aria-label="Next testimonials"
          >
            <svg className="w-5 h-5 text-gray-400 hover:text-[#00FFD1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mb-16">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${i === currentIndex ? 'bg-[#00FFD1] w-8' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Bottom stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto pt-16 border-t border-gray-800">
          <div className="text-center space-y-2">
            <div className="text-[#00FFD1] text-3xl font-bold">500%</div>
            <div className="text-gray-400 text-sm">Average Improvement</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-[#00FFD1] text-3xl font-bold">4.9</div>
            <div className="text-gray-400 text-sm">App Store Rating</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-[#00FFD1] text-3xl font-bold">12</div>
            <div className="text-gray-400 text-sm">Weeks Avg. Goal Time</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-[#00FFD1] text-3xl font-bold">95%</div>
            <div className="text-gray-400 text-sm">User Retention</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;