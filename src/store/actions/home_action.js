import axios from "../../axios";
const actionType = require("./actionTypes");
const _ = require("lodash");

export const callActionForGetDataForApp = (bucketData, toDoData) => {
  let groupByBucket = _.groupBy(toDoData.data, "bucket_id");
  let data = {
    todo: groupByBucket,
    bucketData: bucketData.data,
  };
  return {
    type: actionType.GET_HOME_DATA,
    data,
  };
};

export const insertNewTodo = (bucketId, todo) => {
  console.log("==================" + bucketId);
  console.log("==================" + todo);

  let data = {
    bucketId,
    todo,
  };
  return {
    type: actionType.CREATE_TODO,
    data,
  };
};
export const createTodo = (todoDetails) => {
  let body = {
    name: todoDetails.todoContent,
    bucket_id: todoDetails.bucketCode,
  };

  return async (dispatch) => {
    let todo = await axios.post("/todo/add", body);
    dispatch(insertNewTodo(todoDetails.bucketCode, todo.data));
  };
};

export const removeTodo = (todoCode, bucketCode) => {
  let data = {
    todoCode,
    bucketCode,
  };
  return {
    type: actionType.DELETE_TODO,
    data,
  };
};
export const deleteTodo = (deleteTodoDetails) => {
  let todoCode = deleteTodoDetails.todoId;
  let bucketCode = deleteTodoDetails.bucketId;

  return async (dispatch) => {
    try {
      let deleteData = await axios.delete(`/todo/delete/${todoCode}`);
      dispatch(removeTodo(todoCode, bucketCode));
    } catch (e) {
      console.log("erro", e);
    }
  };
};

export const updateTodoAsMarked = (todoCode, bucketCode) => {
  let data = {
    todoCode,
    bucketCode,
  };
  return {
    type: actionType.UPDATE_TODO,
    data,
  };
};

export const updateNewBucket = (body, response) => {
  let data = response.data.data;
  return {
    type: actionType.UPSERT_BUCKET,
    data,
  };
};
export const updateTodo = (markUpdate) => {
  let todoCode = markUpdate.todoId;
  let bucketCode = markUpdate.bucketId;
  let body = {
    marked: markUpdate.markedValue,
  };
  return async (dispatch) => {
    try {
      let updateData = await axios.post(`/todo/update/${todoCode}`, body);
      dispatch(updateTodoAsMarked(todoCode, bucketCode));
    } catch (e) {
      console.log("erro", e);
    }
  };
};

export const getAllForHome = () => {
  return async (dispatch) => {
    try {
      let bucketData = await axios.get("/bucket/getALL");
      let toDoData = await axios.get("/todo/getALL");
      dispatch(callActionForGetDataForApp(bucketData.data, toDoData.data));
    } catch (e) {
      console.log("Error occur while getAll For home", e);
    }
  };
};

export const createAndUpdateBucket = (details) => {
  try {
    return async (dispatch) => {
      let data = await axios.post("/bucket/add", details);
      dispatch(updateNewBucket(details, data));
    };
  } catch (e) {
    console.log("Error occur while getAll For home", e);
  }
};
