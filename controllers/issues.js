const { projectName } = require("../issueprueba");

const createIssue = (issue) => {
  const requiredProps = ["issue_title", "issue_text", "created_by"];
  const optionalProps = ["assigned_to", "status_text"];
  const additionalProps = {
    _id: (projectName.length + 1).toString(), // Genera un nuevo ID
    created_on: new Date(),
    updated_on: new Date(),
    open: true,
  };

  // Verifica que se proporcionen los campos requeridos
  for (const prop of requiredProps) {
    if (!issue[prop]) {
      return { error: "required field(s) missing" };
    }
  }

  // Establece campos opcionales a cadena vacía si no se proporcionan
  for (const prop of optionalProps) {
    if (!issue[prop]) {
      issue[prop] = "";
    }
  }

  const newIssue = { ...issue, ...additionalProps };
  projectName.push(newIssue);

  return newIssue; // Retorna el objeto creado
};

const readIssue = (params) => {
  if (!params || typeof params !== "object" || Object.keys(params).length === 0) {
    // Si no se proporcionan parámetros de consulta, devuelve todos los problemas
    return projectName.map((issue) => ({
      issue_title: issue.issue_title || "",
      issue_text: issue.issue_text || "",
      created_by: issue.created_by || "",
      assigned_to: issue.assigned_to || "",
      status_text: issue.status_text || "",
      created_on: issue.created_on || "",
      updated_on: issue.updated_on || "",
      open: issue.open || true,
      _id: issue._id || "",
    }));
  }

  // Filtra los problemas por campo y valor si se proporcionan parámetros de consulta
  const filteredIssues = projectName.filter((issue) => {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if (issue[key] !== params[key]) {
          return false;
        }
      }
    }
    return true;
  });

  return filteredIssues.map((issue) => ({
    issue_title: issue.issue_title || "",
    issue_text: issue.issue_text || "",
    created_by: issue.created_by || "",
    assigned_to: issue.assigned_to || "",
    status_text: issue.status_text || "",
    created_on: issue.created_on || "",
    updated_on: issue.updated_on || "",
    open: issue.open || true,
    _id: issue._id || "",
  }));
};



const updateIssue = (id, fieldsToUpdate) => {
  if (!id) {
    return { error: 'missing _id' };
  }

  if (Object.keys(fieldsToUpdate).length === 0) {
    return { error: 'no update field(s) sent', _id: id };
  }

  // Busca el issue por _id en el array projectName
  const issueToUpdate = projectName.find((issue) => issue._id === id);

  if (!issueToUpdate) {
    return { error: 'could not update', _id: id };
  }

  // Actualiza los campos
  for (const key in fieldsToUpdate) {
    if (fieldsToUpdate.hasOwnProperty(key)) {
      issueToUpdate[key] = fieldsToUpdate[key];
    }
  }

  // Actualiza la fecha de actualización
  issueToUpdate.updated_on = new Date();

  return { result: 'successfully updated', '_id': id };
};

const deleteIssue = (id) => {
  if (!id) {
    return { error: "missing _id" };
  }

  const issueIndex = projectName.findIndex((issue) => issue._id === id);

  if (issueIndex === -1) {
    return { error: "could not delete", _id: id };
  }

  projectName.splice(issueIndex, 1);

  return { result: "successfully deleted", _id: id };
};

module.exports = {
  createIssue,
  readIssue,
  updateIssue,
  deleteIssue,
};