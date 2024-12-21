
type Problem = {
  title: string;
  difficulty: string;
  explaination: string;
  tag: string;
  created_at: string;
};

const problems: Problem[] = [
  {
    title: 'Two Sum',
    difficulty: 'Easy',
    explaination: 'Design',
    tag: 'Hash Map, Array',
    created_at: '12/10/2021',
  },
  {
    title: 'Palindrome Number',
    difficulty: 'Easy',
    explaination: 'Design',
    tag: 'Hash Map, Array',
    created_at: '12/10/2021',
  },
  // Add more employee data here...
];

const ProblemTable = () => {
    return (
        <div className="p-4">
          <table className="w-full text-left border-collapse ">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3 border-b border-[#A2A1A833]">Title</th>
                <th className="p-3 border-b border-[#A2A1A833]">Difficulty</th>
                <th className="p-3 border-b border-[#A2A1A833]">Explanation</th>
                <th className="p-3 border-b border-[#A2A1A833]">Tag</th>
                <th className="p-3 border-b border-[#A2A1A833]">Created Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#A2A1A833]">
              {problems.map((problem, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-800 transition-colors duration-200"
                >
                  <td className="p-5">{problem.title}</td>
                  <td className="p-5">{problem.difficulty}</td>
                  <td className="p-5">{problem.explaination}</td>
                  <td className="p-5">{problem.tag}</td>
                  <td className="p-5">{problem.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      
};

export default ProblemTable;
