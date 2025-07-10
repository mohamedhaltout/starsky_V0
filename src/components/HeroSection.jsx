import PromptForm from "./PromptForm";

function HeroSection({ prompt, setPrompt, onSubmit }) {
  return (
    <section className="text-center mb-8">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-dark-gray text-transparent bg-clip-text">
        Describe your website, and we'll generate it!
      </h1>
      <h2 className="text-2xl font-light text-gray-300 mb-10">
        Tell Starsky what to build

      </h2>

      <div className="max-w-2xl mx-auto">
        <PromptForm prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} />
      </div>
    </section>
  );
}

export default HeroSection;
