import React, { useState } from 'react';
import Card from './Card';

const Cards = (props) => {
  let courses = props.courses;
  let category = props.category;
  // for handling the liked or unliked courses
  const[likedCourses, setLikedCourses] = useState([]);

  // we want these all key-values type objects in a single array so we are accessing these objects by using forEach loop
  function getCourses() {
    if(category === "All") {
      let allCourses = [];
      Object.values(courses).forEach((arrayOrItem) => {
        // Check if the current value is an array
        if (Array.isArray(arrayOrItem)) {
          // If it's an array, use forEach
          arrayOrItem.forEach((courseData) => {
            allCourses.push(courseData);
          });
        } else {
          // If it's not an array, assume it's a single course object
          allCourses.push(arrayOrItem);
        }
      });
      return allCourses;
    }
    else {
      // we pass the specific data based on our filters
      return courses[category];
    }
  }

  return (
    <div className='flex flex-wrap justify-center gap-4 mb-4'>
      {getCourses().map((course) => (
        <Card key={course.id} course={course} likedCourses={likedCourses} setLikedCourses={setLikedCourses} />
      ))}
    </div>
  );
};

export default Cards;
