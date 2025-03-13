import { useState } from 'react';

const skills = {
  'Programming Languages': ['Python', 'Rust', 'Java', 'TypeScript', 'Scala'],
  'Development Tools': ['AWS S3','AWS Lambda', 'AWS SageMaker', 'Docker', 'Git'],
  'Libraries/Frameworks': ['XGBoost', 'scikit-learn', 'PyTorch', 'pandas', 'NumPy', 'Dask', 'LangChain'],
  'Data Visualization': ['Tableau', 'Matplotlib', 'Seaborn', 'Plotly'],
  'Database Management': ['PostgreSQL', 'SQLite', 'Neo4j'],
  'Web Development': ['React', 'Next.js', 'Tailwind CSS'],
};

export default function SkillsBoard() {
  const [highlighted, setHighlighted] = useState(null);

  // Gruvbox colors for titles (skipping orange and yellow)
  const gruvboxColors = {
    'Programming Languages': 'text-gruvbox-purple',
    'Development Tools': 'text-gruvbox-blue',
    'Libraries/Frameworks': 'text-gruvbox-aqua',
    'Data Visualization': 'text-gruvbox-aqua',
    'Database Management': 'text-gruvbox-green',
    'Web Development': 'text-gruvbox-purple',
  };

  return (
    <div className="w-full py-12 px-4 text-gruvbox-fg flex flex-col justify-center items-center">
      {/* Use a wider grid that fills the available space */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="bg-gruvbox-bg p-8 rounded-lg">
            <h3 className={`text-2xl font-bold mb-6 ${gruvboxColors[category]}`}>
              {category}
            </h3>
            <div className="flex flex-wrap gap-4">
              {items.map((skill) => (
                <span
                  key={skill}
                  className={`px-6 py-3 rounded-xl text-base font-medium cursor-pointer transition-all duration-200 ${
                    highlighted === skill
                      ? 'bg-gruvbox-orange text-gruvbox-bg0'
                      : 'bg-gruvbox-bg3 text-gruvbox-fg'
                  } hover:scale-105`}
                  onMouseEnter={() => setHighlighted(skill)}
                  onMouseLeave={() => setHighlighted(null)}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
