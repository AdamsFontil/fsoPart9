interface ContentProps {
  name: string;
  exerciseCount: number;
}

interface AllCourses {
  courseParts: ContentProps[];
}

const Content = (props: AllCourses)  => {
  console.log('here are the props',props)
  return (
    <div>
   {props.courseParts.map((item, index) => (
    <p key={index}>
      {item.name} {item.exerciseCount}
    </p> )
   )}

  </div>
  )
};



export default Content
