import { useRef } from "react";
import { Counter } from "../ui/Counter";
import { useScroll } from "framer-motion";
import { StoryWord } from "../ui/StoryWord";

const StorySection = () => {
  const storyText =
    "More than just a garage. We are a community built on passion for two wheels. Every bike tells a story and we help you write yours.".split(
      " ",
    );
  const storyRef = useRef(null);
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start 80%", "center center"],
  });

  return (
    <section className="py-24 md:py-32 px-6 bg-black relative" id="about">
      <div className="max-w-5xl mx-auto">
        <div
          className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-serif leading-tight mb-24 relative"
          ref={storyRef}
        >
          {storyText.map((word, i) => {
            const isHighlight = ["community", "passion", "story"].includes(
              word.replace(/[—.]/g, "").toLowerCase(),
            );
            return (
              <StoryWord
                key={i}
                word={word}
                progress={storyProgress}
                index={i}
                total={storyText.length}
                isHighlight={isHighlight}
              />
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-border/50 pt-16">
          <div>
            <div className="text-5xl md:text-6xl font-bold text-primary font-mono mb-2">
              <Counter from={0} to={500} />
            </div>
            <div className="text-muted-foreground uppercase tracking-widest text-sm">
              Bikes Serviced
            </div>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-bold text-primary font-mono mb-2">
              <Counter from={0} to={1000} />
            </div>
            <div className="text-muted-foreground uppercase tracking-widest text-sm">
              Parts Available
            </div>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-bold text-primary font-mono mb-2">
              <Counter from={0} to={50} />
            </div>
            <div className="text-muted-foreground uppercase tracking-widest text-sm">
              Expert Mechanics
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
