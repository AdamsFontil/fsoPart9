import Header from "./components/Header";
import Total from "./components/Total"
import Content from "./components/Content";
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      < Header title={courseName} />
      < Content name={courseParts[0].name} exerciseCount={courseParts[0].exerciseCount} />
      < Content name={courseParts[1].name} exerciseCount={courseParts[1].exerciseCount} />
      < Content name={courseParts[2].name} exerciseCount={courseParts[2].exerciseCount} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
