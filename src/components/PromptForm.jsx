function PromptForm({ prompt, setPrompt, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex gap-4 mb-6">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your website idea..."
        className="flex-1 px-4 py-4 border border-zinc-700 rounded-lg shadow-sm bg-[#1E2024] text-gray-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-button-gradient text-white px-4 py-2 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950 cursor-pointer"
      >
        Generate
      </button>
    </form>
  );
}

export default PromptForm;
