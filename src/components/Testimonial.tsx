import React from 'react';

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
  }
] as const;

interface TestimonialCardProps {
  readonly testimonial: TestimonialData;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { name, role, content, rating, pullUpsBefore, pullUpsAfter, timeframe } = testimonial;

  return (
    <div className="relative bg-neutral-900 border border-gray-800 p-8 group hover:border-[#00FFD1]/30 transition-all duration-300">
      {/* Rating */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: rating }, (_, i) => (
          <div key={i} className="w-4 h-4 bg-[#00FFD1] rounded-full" />
        ))}
      </div>

      {/* Content */}
      <blockquote className="text-gray-300 text-lg leading-relaxed mb-8">
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

const Testimonials: React.FC = () => {
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

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
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