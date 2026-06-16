interface StepItem {
  num: string;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  dict: {
    heading: string;
    headingAccent: string;
    subtext: string;
    steps: StepItem[];
  };
  locale: string;
}

const icons = [
  // Step 1: Call/WhatsApp
  <svg key="1" className="w-8 h-8 text-accent-dark group-hover:text-accent transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>,
  // Step 2: Evaluation
  <svg key="2" className="w-8 h-8 text-accent-dark group-hover:text-accent transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>,
  // Step 3: Dismantling
  <svg key="3" className="w-8 h-8 text-accent-dark group-hover:text-accent transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>,
  // Step 4: Payment
  <svg key="4" className="w-8 h-8 text-accent-dark group-hover:text-accent transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
];

export default function HowItWorksSection({ dict }: HowItWorksSectionProps) {
  return (
    <section 
      className="relative w-full py-20 md:py-28 px-4 bg-slate-50 border-y border-slate-100 overflow-hidden" 
      id="how-it-works"
      aria-labelledby="how-works-heading"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/4 -end-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -start-32 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        
        {/* Section Title */}
        <h2 id="how-works-heading" className="text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight">
          {dict.heading} <span className="text-gradient-gold drop-shadow-sm">{dict.headingAccent}</span>
        </h2>
        
        {/* Subtext description */}
        <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12 md:mb-16 font-medium">
          {dict.subtext}
        </p>

        {/* 4 Steps Row Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Decorative connector line on desktop */}
          <div className="hidden lg:block absolute top-[68px] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-secondary/40 via-accent/40 to-secondary/40 pointer-events-none" />

          {dict.steps.map((step, idx) => (
            <div 
              key={idx}
              className="flex flex-col items-center bg-bg-card rounded-2xl p-6 border border-slate-100/80 relative z-10 card-premium hover:border-accent/20 group text-center"
            >
              
              {/* Step number bubble */}
              <div className="absolute -top-4 bg-secondary text-primary-dark font-black text-sm w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 select-none">
                {step.num}
              </div>

              {/* Icon Container */}
              <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 mt-2 shrink-0 transition-all duration-300 group-hover:bg-accent/10 group-hover:border-accent/20">
                {icons[idx]}
              </div>

              {/* Step details */}
              <h3 className="text-lg font-bold text-primary mb-2.5 group-hover:text-secondary-dark transition-colors duration-200">
                {step.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed font-medium">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
