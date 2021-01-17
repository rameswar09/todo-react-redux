const actionType = require("../actions/actionTypes");
const _ = require("lodash");

const inititalState = {
  bucketData: [],
  todoData: [],
};

const setHomeData = (state, responseData) => {
  let finalState = { ...state };
  finalState.bucketData = responseData.bucketData;
  finalState.todoData = responseData.todo;
  return finalState;
};

const insertTodo = (state, newTodoData) => {
  let finalState = { ...state };
  let bucketid = _.get(newTodoData, "bucketId", "");
  let bucketDetails = [];
  if (!_.isEmpty(finalState.todoData[bucketid])) {
    bucketDetails = [...finalState.todoData[bucketid]];
  }
  bucketDetails.push(newTodoData.todo.data);
  finalState.todoData[bucketid] = bucketDetails;
  return finalState;
};

const deleteTodoFromBucketDetails = (state, data) => {
  let finalState = { ...state };
  let bucketId = data.bucketCode;
  let todoId = data.todoCode;
  let bucketDetails = finalState.todoData[bucketId];
  _.remove(bucketDetails, { code: todoId });
  finalState.todoData[bucketId] = bucketDetails;
  return finalState;
};

const updateTodoForBucket = (state, data) => {
  let finalState = { ...state };
  let bucketId = data.bucketCode;
  let todoId = data.todoCode;
  let bucketDetails = finalState.todoData[bucketId];
  let todoDetails = _.find(bucketDetails, { code: todoId });
  _.set(todoDetails, "marked", !_.get(todoDetails, "marked", false));
  finalState.todoData[bucketId] = bucketDetails;
  return finalState;
};

const upsertBucketDetails = (state, data) => {
  let finalState = { ...state };
  let bucketDetails = finalState.bucketData || [];
  if (_.isEmpty(bucketDetails)) {
    bucketDetails = [];
  }
  let existData = _.find(bucketDetails, { code: data.code });
  if (!_.isEmpty(existData)) {
    _.remove(bucketDetails, { code: data.code });
  }
  bucketDetails.push(data);
  bucketDetails = _.uniqBy(bucketDetails, "code");
  finalState.bucketData = bucketDetails;
  return finalState;
};
const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case actionType.GET_HOME_DATA:
      return setHomeData(state, action.data);
      break;
    case actionType.CREATE_TODO:
      return insertTodo(state, action.data);
      break;
    case actionType.DELETE_TODO:
      return deleteTodoFromBucketDetails(state, action.data);
      break;
    case actionType.UPDATE_TODO:
      return updateTodoForBucket(state, action.data);
      break;
    case actionType.UPSERT_BUCKET:
      return upsertBucketDetails(state, action.data);
      break;
  }

  return state;
};

export default reducer;
