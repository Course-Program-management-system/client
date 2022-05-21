import axios from "axios";

// const usersUrl = 'http://localhost:3003/users';
const usersUrl = "http://localhost:9000/users";
const teachersUrl = "http://localhost:9000/teacher";

export const getUsers = async (id) => {
  id = id || "";
  return await axios.get(`${usersUrl}/department/${id}`);
};

export const addUser = async (user) => {
  return await axios.post(`${usersUrl}/add`, user);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${usersUrl}/${id}`);
};

export const editUser = async (id, user) => {
  return await axios.put(`${usersUrl}/edit/department/${id}`, user);
};

//teacher ***************

export const getTeachers = async (id) => {
  id = id || "";
  return await axios.get(`${teachersUrl}/teacher/${id}`);
};
export const addTeacher = async (teacher) => {
  return await axios.post(`${teachersUrl}/addteacher`, teacher);
};

export const deleteTeacher = async (id) => {
  return await axios.delete(`${teachersUrl}/delete/teacher/${id}`);
};

export const editTeacher = async (id, teacher) => {
  return await axios.put(`${teachersUrl}/edit/teacher/${id}`, teacher);
};

// cal

export const getCal = async (id) => {
  id = id || "";
  return await axios.get(`${usersUrl}/cal/${id}`);
};

export const addCal = async (user) => {
  return await axios.post(`${usersUrl}/addcal`, user);
};

export const deleteCal = async (id) => {
  return await axios.delete(`${usersUrl}/${id}`);
};

export default class Api {
  static getProfile() {
    return axios.get("/admin/profile");
  }
  static verifyAdmin(url, authData, password) {
    return axios.post(url, { authData, password });
  }

  //PROGRAMS
  static getPrograms() {
    return axios.get("/program");
  }
  static deleteProgramById(id) {
    return axios.delete(`/program/${id}`);
  }
  static createProgram(departmentId, data) {
    return axios.post(`/department/${departmentId}/program`, data);
  }
  static addTeacherToProgram(programId, email) {
    return axios.post(`/program/${programId}/user`, { email });
  }
  static UpdateProgram(programId, data) {
    return axios.put(`/program/${programId}`, data);
  }
  //DEPARTMENTS
  static getDepartments() {
    return axios.get("/department");
  }
  static createDepartment(data) {
    return axios.post(`/department`, data);
  }
  static deleteDepartmentById(id) {
    return axios.delete(`/department/${id}`);
  }
  static updateDepartment(departmentId, data) {
    return axios.put(`/department/${departmentId}`, data);
  }
  static addDirectorToDepartment(departmentId, email) {
    return axios.post(`/department/${departmentId}/user`, { email });
  }

  //subjects
  static getSubjects() {
    return axios.get("/subject");
  }
  static deleteSubjectById(id) {
    return axios.delete(`/subject/${id}`);
  }
  static updateSubject(id, data) {
    return axios.put(`/subject/${id}`, data);
  }
  static createSubject(programId, data) {
    return axios.post(`/program/${programId}/subject`, data);
  }

  //generic

  static registerAdmin(param, id, { email, file, name }) {
    console.log({ email, file, name });
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(`/${param}/${id}/user`, file ? formData : { email });
  }
}
