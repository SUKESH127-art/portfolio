"use client";
import PropTypes from 'prop-types';
import ScrollStack, { ScrollStackItem } from "../ui/ScrollStack";

/**
 * ExperienceCard Component
 * Renders an individual experience card with company logo, job title, role, and date.
 * Uses a glassmorphic design with backdrop blur and semi-transparent backgrounds.
 */
const ExperienceCard = ({ title, job, date, logo }) => (
  <article className="flex flex-col gap-5 md:flex-row md:items-center">
    {/* Company logo container with glassmorphic styling */}
    <div className="shrink-0 self-center md:self-auto">
      <div className="rounded-3xl border border-white/35 bg-white/15 backdrop-blur-xl shadow-[0_15px_35px_rgba(15,23,42,0.25)] p-3">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10">
          {logo ? (
            <img
              src={logo}
              alt={`${job} logo`}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          ) : null}
        </div>
      </div>
    </div>

    {/* Experience details: date, job title, and role */}
    <div className="flex-1 space-y-1.5">
      <p className="text-xs uppercase tracking-[0.25em] text-[#475569]">
        {date}
      </p>
      <h3 className="text-2xl font-semibold text-[#0c4a6e]">{job}</h3>
      <p className="text-lg text-[#0369a1]">{title}</p>
    </div>
  </article>
);

/**
 * Timeline Component
 * Renders a stack of experience cards that create a stacked/overlapping visual effect.
 * Uses ScrollStack and ScrollStackItem components to achieve the stacking animation.
 * 
 * The stacking effect is achieved through:
 * 1. ScrollStack: Container that handles scroll-based positioning
 * 2. ScrollStackItem: Individual cards that stack on top of each other with CSS transforms
 * 3. Each card has a glassmorphic design with backdrop blur and semi-transparent background
 */
export const Timeline = ({ data }) => {
  return (
    <div className="c-space">
      <div className="relative pt-8">
        <div className="flex justify-center">
          <div className="relative max-w-2xl w-full">
            {/* ScrollStack creates the stacking container with scroll-based animations */}
            <ScrollStack>
              {/* Map over experience data to create stacked cards */}
              {data.map(item => (
                <ScrollStackItem
                  key={`${item.job}-${item.date}`}
                  itemClassName="backdrop-blur-2xl bg-white/95 dark:bg-slate-900/80 border border-white/40 shadow-2xl"
                >
                  {/* Render individual experience card with company info */}
                  <ExperienceCard {...item} />
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </div>
      </div>
    </div>
  );
};

ExperienceCard.propTypes = {
  title: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  logo: PropTypes.string
};

Timeline.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
    logo: PropTypes.string,
    contents: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
};
 