/*
    POST REQUIREMENTS
    Required fields:
        issue_title
        issue_text
        created_by
        assigned_to
        status_text
    Return: created object including all of the submitted fields
            optional fields return empty strings
            additional created_on(date time) // updated_on(date time) // open(bool)
    If no required fields sent Return { error: 'required field(s) missing' }
*/

const createIssue = (issue) => {
  const reqProp = ["issue_title", "issue_text", "created_by"];
  const optProp = ["assigned_to", "status_text"];
  const additional = {
    _id: "1",
    created_on: new Date(),
    updated_on: new Date(),
    open: true,
  };

  for (const el of reqProp) {
    if (!issue.hasOwnProperty(el) || issue[el].length <= 0) {
      return { error: "required field(s) missing" };
    }
  }

  for (const el of optProp) {
    if (!issue.hasOwnProperty(el)) {
      issue[el] = "";
    }
  }

  return { ...issue, ...additional };
};

const readIssue = (issue) => {};

const updateIssue = (issue) => {};

const deleteIssue = (issue) => {};

module.exports = {
  createIssue,
  readIssue,
  updateIssue,
  deleteIssue,
};
