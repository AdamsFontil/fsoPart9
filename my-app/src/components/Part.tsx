interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CourseWithDescription {
  kind: "basic";
}

interface CoursePartGroudiv extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CourseWithDescription {
  backgroundMaterial: string;
  kind: "background";
}
  interface CoursePartSpecial extends CourseWithDescription {
    requirements: string[];
    kind: "special"
  }


type CoursePart = CoursePartBasic | CoursePartGroudiv | CoursePartBackground | CoursePartSpecial

interface AllCourses {
  courseParts: CoursePart[];
}

const Part = (props: AllCourses) => {
  console.log('here are the props from Part----', props);

  return (
    <div>
      {props.courseParts.map((part, index) => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={index}>
                <div>
                <h4>{part.name} {part.exerciseCount} </h4>
                <i>{part.description}</i>
                </div>
              </div >
            );
          case "group":
            return (
              <div key={index}>
                <div>
                <h4>{part.name} {part.exerciseCount} </h4>
                <p>{part.groupProjectCount}</p>
                </div>
              </div >
            );
          case "background":
            return (
              <div key={index}>
                <div>
                <h4>{part.name} {part.exerciseCount} </h4>
                <i>{part.description}</i>
                <p>{part.backgroundMaterial}</p>
                </div>
              </div >
            );
          case "special":
            return (
              <div key={index}>
                <div>
                <h4>{part.name} {part.exerciseCount} </h4>
                <i>{part.description}</i>
                <p>{part.requirements}</p>
                </div>
              </div >
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Part;
