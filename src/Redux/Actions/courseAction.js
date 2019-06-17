import * as types from "./course/actionTypes";
import * as courseApi from "../../api/courseApi";


export function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSucccess(courses) {
  return { type: types.UPDATE_COURSE_SUCCESS, courses };
}

export function createCourseSucccess(courses) {
  return { type: types.CREATE_COURSE_SUCCESS, courses };
}


export function loadCourses() {
  return function(dispatch) {
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function(dispatch, getState) {
    return courseApi
      .saveCourse(course)
      .then(saveCourse => {
        course.id
          ? dispatch(updateCourseSucccess(saveCourse))
          : dispatch(createCourseSucccess(saveCourse));
      })
      .catch(error => {
        throw error;
      });
  };
}
