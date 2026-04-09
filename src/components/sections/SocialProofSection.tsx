// import { useScrollReveal } from "@/hooks/useScrollReveal";
// import { Star } from "lucide-react";


// const testimonials = [
//   { name: "Ahmad Al-Rashid", role: "Principal Architect, Dubai", text: "CompoPanel's fire-rated panels gave us the safety and aesthetics we needed for our 40-story tower project." },
//   { name: "Elena Müller", role: "Construction Director, Berlin", text: "Exceptional product consistency and on-time delivery. We've used them across 12 projects without a single issue." },
//   { name: "James Chen", role: "Facade Engineer, Singapore", text: "The PVDF coated panels have held up perfectly in tropical conditions for over 8 years. Outstanding durability." },
// ];

// const SocialProofSection = () => {
//   const ref = useScrollReveal();

//   return (
//     <section ref={ref} className="section-padding">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <p className="reveal text-accent uppercase tracking-[0.2em] text-sm mb-4">Testimonials</p>
//           <h2 className="reveal reveal-delay-1 heading-lg">
//             Trusted by <span className="text-gradient">Industry Leaders</span>
//           </h2>
//         </div>
//         <div className="grid md:grid-cols-3 gap-8">
//           {testimonials.map((t, i) => (
//             <div
//               key={t.name}
//               className={`reveal reveal-delay-${i + 1} p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300`}
//             >
//               <div className="flex gap-1 mb-4">
//                 {[...Array(5)].map((_, j) => (
//                   <Star key={j} className="w-4 h-4 fill-accent text-accent" />
//                 ))}
//               </div>
//               <p className="text-foreground/80 mb-6 leading-relaxed">"{t.text}"</p>
//               <div>
//                 <p className="font-heading font-semibold text-foreground">{t.name}</p>
//                 <p className="text-sm text-muted-foreground">{t.role}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SocialProofSection;
